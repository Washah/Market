import React from "react";
import { getOrdersAmount } from "../api/orderApi";
import { useProductState } from "../hooks/useProductState";
import { Typography, Box, Paper, CircularProgress } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import useResponsive from "../hooks/useResponsive";

const ProductsOrdersAmount = () => {
  // Fetching the products data from the Redux store using a custom hook
  const { products } = useProductState();
  // State to keep track of the total orders amount and its loading state
  const [orderAmount, setOrderAmount] = React.useState<null | number>(null);
  const [productsLoading, setProductsLoading] = React.useState(true);

  // Simulate loading state for products for 1 second
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProductsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Fetching the total orders amount after component mounts
  React.useEffect(() => {
    const ordersAmount = async () => {
      try {
        const response = await new Promise<number>(resolve =>
          setTimeout(() => resolve(getOrdersAmount()), 1000)
        );
        setOrderAmount(response);
      } catch (err) {
        console.error(err);
      }
    };
    ordersAmount();
  }, []);

  const { isSmallDesktop } = useResponsive();

  return (
    <Box display="flex" justifyContent="center" mt={4} sx={{ padding: "1rem" }}>
      <Paper
        elevation={4}
        style={{
          padding: "1rem",
          width: isSmallDesktop ? "20rem" : "24rem",
          backgroundColor: "#f7f7f7",
        }}
      >
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center">
            <StorefrontIcon color="primary" fontSize="large" />
            <Typography variant="h6">
              Available products in our store:
            </Typography>
          </Box>
          <Typography variant="h6">
            {productsLoading ? <CircularProgress size={20} /> : products.length}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <ShoppingBagIcon color="secondary" fontSize="large" />
            <Typography variant="h6">Number of orders submitted:</Typography>
          </Box>
          <Typography variant="h6">
            {orderAmount === null ? (
              <CircularProgress size={20} />
            ) : (
              orderAmount
            )}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProductsOrdersAmount;
