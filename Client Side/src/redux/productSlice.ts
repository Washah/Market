import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../models/Product";

// Initial state
interface ProductState {
  products: Product[];
  searchProducts: Product[];
  productToEdit: Product | null;
}

const initialState: ProductState = {
  products: [],
  searchProducts: [],
  productToEdit: null,
};

// helper function ro update product in the array
const updateProductInArray = (array: Product[], updatedProduct: Product) =>
  array.map(product =>
    product._id === updatedProduct._id ? updatedProduct : product
  );

// create a slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Handle the action to get all products
    getAllProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.searchProducts = action.payload;
    },
    // Handle the action to add a product
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      state.searchProducts.push(action.payload);
    },
    // Handle the action to search for products
    searchProducts: (state, action: PayloadAction<Product[]>) => {
      state.searchProducts = action.payload;
    },
    // set the product to update in the store
    productToEdit: (state, action: PayloadAction<Product | null>) => {
      state.productToEdit = action.payload;
    },
    // handle the action to update a product
    editProduct: (state, action: PayloadAction<Product>) => {
      state.products = updateProductInArray(state.products, action.payload);
      state.searchProducts = updateProductInArray(
        state.searchProducts,
        action.payload
      );
      state.productToEdit = null;
    },
  },
});

export const {
  getAllProducts,
  addProduct,
  searchProducts,
  productToEdit,
  editProduct,
} = productSlice.actions;

export default productSlice.reducer;
