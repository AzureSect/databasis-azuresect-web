import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Product } from "@/types";
import api from "@/services/api";

interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await api.get<Product[]>("/products");
  return response.data;
});

export const createProduct = createAsyncThunk(
  "products/create",
  async (product: Omit<Product, "id">) => {
    const response = await api.post<Product>("/products", product);
    return response.data;
  },
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async (product: Product) => {
    const response = await api.put<Product>(`/products/${product.id}`, product);
    return response.data;
  },
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: number) => {
    await api.delete(`/products/${id}`);
    return id;
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao buscar produtos";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
