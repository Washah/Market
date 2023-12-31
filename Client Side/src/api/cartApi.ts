import { CartItem } from "../models/CartItem";
import api from "./apiConfig";

// Function to check if user has an cart and if no create it
export const checkShoppingCart = async (userId: string) => {
  try {
    const response = await api.get(`cart/checkShoppingCart/${userId}`);
    if (response.status === 200 || 201) return response.data;
  } catch (err) {
    throw err;
  }
};

// function to add item to a cart
export const addItemToCartApi = async (cartId: string, cartItem: {}) => {
  try {
    const response = await api.post(`cart/addItemToCart/${cartId}`, cartItem);
    if (response.status === 201 || 200) return response.data;
  } catch (err) {
    throw err;
  }
};

// function to get all cart items
export const getCartItems = async (cartId: string) => {
  try {
    const response = await api.get(`cart/getCartItems/${cartId}`);
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};

// delete item from cart
export const deleteCartItem = async (cartId: string, productId: String) => {
  try {
    const response = await api.delete(
      `cart/deleteCartItem/${cartId}/${productId}`
    );
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};

// update cart item
export const updateCartItemApi = async (item: CartItem) => {
  try {
    const response = await api.put(`cart/updateCartItem`, item);
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};

// delete all items from cart
export const deleteAllCartItemsApi = async (cartId: string) => {
  try {
    const response = await api.delete(`cart/deleteAllCartItems/${cartId}`);
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};
