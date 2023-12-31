import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type of the state
interface CategoryState {
  selectedCategory: string | null;
}

// Initial state
const initialState: CategoryState = {
  selectedCategory: null,
};

// create a slice
const categorySlice = createSlice({
  name: "category",
  initialState,
  // Define reducer functions and their corresponding action creators
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    resetSelectedCategory: state => {
      state.selectedCategory = null;
    },
  },
});

export const { setSelectedCategory, resetSelectedCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
