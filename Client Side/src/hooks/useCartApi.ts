import { useDispatch } from "react-redux";
import { deleteAllCartItemsApi, getCartItems } from "../api/cartApi";
import { useCallback } from "react";
import { deleteAllCartItems, setCartItems } from "../redux/cartSlice";

export const useCartApi = (cartId: string) => {
  const dispatch = useDispatch();

  // Function to fetch all items in the cart from the API
  const getAllCartItems = useCallback(
    async (id: string) => {
      try {
        const response = await getCartItems(id);
        dispatch(setCartItems(response));
      } catch (err) {
        console.error(err);
      }
    },
    [dispatch]
  );

  // Function to handle deleting all items from the cart
  const handleDeleteCart = async () => {
    try {
      const response = await deleteAllCartItemsApi(cartId);
      if (response) dispatch(deleteAllCartItems());
    } catch (err) {
      console.error(err);
    }
  };

  return { getAllCartItems, handleDeleteCart };
};
