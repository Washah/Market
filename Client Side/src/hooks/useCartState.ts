import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

export const useCartState = () => {
  // get the cart state
  const cart = useSelector((state: RootState) => state.shoppingCart.cart);

  // Get cartId from the Redux store
  const cartId =
    useSelector((state: RootState) => state.shoppingCart.cart?._id) ?? "";

  // Get cartItems from the Redux store
  const cartItems = useSelector(
    (state: RootState) => state.shoppingCart.cartItems
  );

  // Get cartItems from the Redux store
  const finishedOrder = useSelector(
    (state: RootState) => state.shoppingCart.finishedOrder
  );

  return { cartId, cartItems, finishedOrder, cart };
};
