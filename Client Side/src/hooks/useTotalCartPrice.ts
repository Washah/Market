import React from "react";
import { CartItem } from "../models/CartItem";

const useTotalCartPrice = (cartItems: CartItem[]) => {
  //state for cart total price
  const [totalPrice, setTotalPrice] = React.useState(0);

  React.useEffect(() => {
    const computedTotal = cartItems.reduce(
      (acc, item) => acc + item.generalPrice,
      0
    );
    setTotalPrice(computedTotal);
  }, [cartItems]); // Recompute the total only if cartItems change

  return totalPrice.toFixed(2);
};

export default useTotalCartPrice;
