import { Card, CardActions, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useCartState } from "../../hooks/useCartState";
import "./StartShopping.css";
import useTotalCartPrice from "../../hooks/useTotalCartPrice";
import { rearrangeDate } from "../../utils/rearrangeDate";
import React from "react";
import { getLastOrder } from "../../api/orderApi";
import { useUserState } from "../../hooks/useUserState";
import CartIcon from "../CartIcon";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const StartShopping = () => {
  // Fetch cart and user state using custom hooks
  const { cartItems, cart } = useCartState();
  const { user } = useUserState();

  // Calculate total price of items in the cart
  const totalPrice = useTotalCartPrice(cartItems);
  // check if there are items in the cart
  const hasItemsInCart = cartItems.length > 0;
  // Re-arrange cart creation date if items exist in the cart
  const cartCreatedAt = hasItemsInCart ? rearrangeDate(cart!.createdAt) : null;
  // State to keep track of the last order made by the user
  const [lastOrder, setLastOrder] = React.useState("");

  // Effect to fetch the last order details when the cart changes
  React.useEffect(() => {
    const userLastOrder = async () => {
      if (cart && cart.customerId) {
        const response = await getLastOrder(cart.customerId);
        setLastOrder(response.orderExecutionDate);
      }
    };
    userLastOrder();
  }, [cart]);

  const isAdmin = user?.role === "admin";
  const firstName = user?.firstName;

  return (
    <div className="startShopping-container">
      <Card className="startShopping-card">
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            className="startShopping-text"
          >
            Welcome, {firstName}!
            {!isAdmin ? (
              <Box>{hasItemsInCart ? "Continue" : "Start"} shopping now.</Box>
            ) : (
              <Box>Manage Your products.</Box>
            )}
          </Typography>
          {!isAdmin &&
            (hasItemsInCart ? (
              <Box sx={{ mt: 2 }}>
                <Box>Shopping cart created on: {cartCreatedAt}</Box>
                <Box>Total cart value: &#8362;{totalPrice}</Box>
              </Box>
            ) : lastOrder ? (
              <Box sx={{ mt: 2 }}>
                Your most recent order was placed on: {rearrangeDate(lastOrder)}
              </Box>
            ) : (
              <Box sx={{ mt: 2 }}>
                Welcome to our store!
                <Box>Begin your premium shopping experience now.</Box>
              </Box>
            ))}
        </CardContent>
        <CardActions className="startShopping-actions">
          <Link to="/shopping" className="startShopping-link">
            {isAdmin ? <ManageAccountsIcon fontSize="large" /> : <CartIcon />}
          </Link>
        </CardActions>
      </Card>
    </div>
  );
};

export default StartShopping;
