import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Material } from "@/types";

interface MaterialState {
  items: Material[];
  loading: boolean;
}

const initialState: MaterialState = {
  items: [],
  loading: false,
};

const materialSlice = createSlice({
  name: "materials",
  initialState,
  reducers: {
    setMaterials: (state, action: PayloadAction<Material[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setMaterials } = materialSlice.actions;
export default materialSlice.reducer;
