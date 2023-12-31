import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../models/CartItem";
import { ShoppingCart } from "../models/ShoppingCart";

// Define the type of the state
interface CartState {
  cart: ShoppingCart | null;
  cartItems: CartItem[];
  finishedOrder: boolean;
}

// Initial state
const initialState: CartState = {
  cart: null,
  cartItems: [],
  finishedOrder: false,
};

// create a slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  // Define reducer functions and their corresponding action creators
  reducers: {
    setCart: (state, action: PayloadAction<ShoppingCart>) => {
      state.cart = action.payload;
    },
    removeCart: state => {
      state.cart = null;
      state.cartItems = [];
    },
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
    },
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      state.cartItems.push(action.payload);
    },
    updateCartItem: (state, action: PayloadAction<CartItem>) => {
      const index = state.cartItems.findIndex(
        cartItem => cartItem._id === action.payload._id
      );
      if (index !== -1) {
        state.cartItems[index] = action.payload;
      }
    },
    deleteItemFromCart: (
      state,
      action: PayloadAction<{ cartId: string; productId: string }>
    ) => {
      state.cartItems = state.cartItems.filter(
        cartItem =>
          cartItem.cartId !== action.payload.cartId ||
          cartItem.productId !== action.payload.productId
      );
    },
    deleteAllCartItems: state => {
      state.cartItems = [];
    },
    setFinishedOrder: state => {
      state.finishedOrder = !state.finishedOrder;
    },
  },
});

// Exporting the action creators
export const {
  setCart,
  removeCart,
  setCartItems,
  addItemToCart,
  updateCartItem,
  deleteItemFromCart,
  deleteAllCartItems,
  setFinishedOrder,
} = cartSlice.actions;

// Exporting the reducer
export default cartSlice.reducer;
