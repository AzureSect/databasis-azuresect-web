import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Material } from "@/types";
import api from "@/services/api";

interface MaterialState {
  items: Material[];
  loading: boolean;
  error: string | null;
}

const initialState: MaterialState = {
  items: [],
  loading: false,
  error: null,
};

export const createMaterial = createAsyncThunk(
  "materials/create",
  async (material: Omit<Material, "id">) => {
    const response = await api.post("/materials", material);
    return response.data;
  },
);

export const updateMaterial = createAsyncThunk(
  "materials/update",
  async (material: Material) => {
    const response = await api.put(`/materials/${material.id}`, material);
    return response.data;
  },
);

export const deleteMaterial = createAsyncThunk(
  "materials/delete",
  async (id: number) => {
    await api.delete(`/materials/${id}`);
    return id;
  },
);

const materialSlice = createSlice({
  name: "materials",
  initialState,
  reducers: {
    setMaterials: (state, action: PayloadAction<Material[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createMaterial.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    builder.addCase(updateMaterial.fulfilled, (state, action) => {
      const index = state.items.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    });

    builder.addCase(deleteMaterial.fulfilled, (state, action) => {
      state.items = state.items.filter((m) => m.id !== action.payload);
    });
  },
});

export const { setMaterials } = materialSlice.actions;
export default materialSlice.reducer;
