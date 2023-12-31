import { useDispatch } from "react-redux";
import { deleteCartItem, updateCartItemApi } from "../api/cartApi";

import { CartItem } from "../models/CartItem";
import { deleteItemFromCart, updateCartItem } from "../redux/cartSlice";

// Define a custom hook to handle cart item API operations
export const useCartItemApi = () => {
  const dispatch = useDispatch();

  // Function to handle the deletion of a cart item
  const handleDeleteCartItem = async (cartId: string, productId: string) => {
    try {
      const response = await deleteCartItem(cartId, productId);
      // If the API call was successful, dispatch an action to update the Redux state
      if (response)
        dispatch(
          deleteItemFromCart({
            cartId: response.cartId,
            productId: response.productId,
          })
        );
    } catch (err) {
      console.error(err);
    }
  };

  // Function to handle the update of a cart item
  const handleUpdateItem = async (
    item: CartItem,
    quantity: number,
    price: number
  ) => {
    try {
      const response = await updateCartItemApi({
        ...item,
        quantity,
        generalPrice: quantity * price,
      });
      if (response) dispatch(updateCartItem(response));
    } catch (err) {
      console.error(err);
    }
  };

  // Return the custom hook's functions for use in components
  return { handleDeleteCartItem, handleUpdateItem };
};
