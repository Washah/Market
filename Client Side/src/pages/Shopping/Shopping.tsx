import Cart from "../../components/Cart/Cart";
import Products from "../../components/Products/Products";
import "./Shopping.css";
import AddProduct from "../../components/AddProduct";
import { useUserState } from "../../hooks/useUserState";
import { useCartState } from "../../hooks/useCartState";
import OrderForm from "../../components/OrderForm/OrderForm";
import React from "react";

const Shopping = () => {
  const { user } = useUserState();
  const { finishedOrder } = useCartState();

  const cartRef = React.useRef(null);

  return (
    <div className="shopping">
      <div className="cartOrAddProduct" ref={cartRef}>
        {/* if admin show add product comp if user show cart comp */}
        {user?.role === "admin" ? <AddProduct /> : <Cart />}
      </div>
      <div className="shopping__main">
        {!finishedOrder ? <Products cartRef={cartRef} /> : <OrderForm />}
      </div>
    </div>
  );
};

export default Shopping;
