import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { SuggestionsPage } from "./SuggestionsPage";
import materialReducer from "@/store/slices/materialSlice";
import productReducer from "@/store/slices/productSlice";
import type { Material, Product } from "@/types";

interface MockState {
  materials: {
    items: Material[];
    loading: boolean;
    error: string | null;
  };
  products: {
    items: Product[];
    loading: boolean;
    error: string | null;
  };
}

const createMockStore = (preloadedState: MockState) => {
  return configureStore({
    reducer: {
      materials: materialReducer,
      products: productReducer,
    },
    preloadedState,
  });
};

describe("SuggestionsPage - Cálculos de Produção", () => {
  it("deve calcular corretamente a quantidade máxima produzível baseada no estoque", () => {
    const mockState: MockState = {
      materials: {
        items: [{ id: 1, name: "Madeira", stockQuantity: 10 } as Material],
        loading: false,
        error: null,
      },
      products: {
        items: [
          {
            id: 1,
            name: "Cadeira",
            value: 50,
            composition: [
              {
                id: 1,
                material: {
                  id: 1,
                  name: "Madeira",
                  stockQuantity: 10,
                } as Material,
                quantityNeeded: 2,
              },
            ],
          } as Product,
        ],
        loading: false,
        error: null,
      },
    };

    const store = createMockStore(mockState);

    render(
      <Provider store={store}>
        <SuggestionsPage />
      </Provider>,
    );

    const capacityLabel = screen.getByText("Capacidade Atual");
    const capacityBox = capacityLabel.closest("div");
    const capabilityValue = within(capacityBox!).getByText(/^5/);
    expect(capabilityValue).toBeDefined();
  });
});
