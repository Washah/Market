import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NumberInput from "../NumberInput";
import { addItemToCartApi } from "../../api/cartApi";
import { useDispatch } from "react-redux";
import { CartItem } from "../../models/CartItem";
import { Product } from "../../models/Product";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { useCartState } from "../../hooks/useCartState";
import { addItemToCart, updateCartItem } from "../../redux/cartSlice";
import "./ProductCard.css";
import { useUserState } from "../../hooks/useUserState";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { productToEdit } from "../../redux/productSlice";

type cardProps = {
  product: Product;
};

// card template for displaying products
const ProductCard: React.FC<cardProps> = ({ product }) => {
  // Local state for managing quantity of product
  const [quantity, setQuantity] = React.useState(1);

  // get the cartId and cartItems and user from a custom hook
  const { cartId, cartItems } = useCartState();
  const { user } = useUserState();
  const isAdmin = user?.role === "admin";

  const dispatch = useDispatch();

  // handle add item to cart
  const addToCart = async (cartItem: CartItem) => {
    try {
      // Check if the item already exists in the cart
      const existingItem = cartItems.find(
        item => item.productId === cartItem.productId
      );
      const response = await addItemToCartApi(cartItem.cartId, cartItem);
      // If item exists, dispatch update action, else dispatch add action
      if (existingItem) {
        dispatch(updateCartItem(response));
      } else {
        dispatch(addItemToCart(response));
      }
      setQuantity(1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditProduct = () => {
    dispatch(productToEdit(product));
  };

  // theme for responsive breakpoints
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1900,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box className="cardBox">
        <Card
          sx={{
            width: { xs: "12rem", xl: "17rem" }, // Change width based on screen size
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: { xs: "18rem", lg: "18rem", xl: "24rem" },
            boxShadow: "0px 5px 10px rgba(0,0,0,0.1)",
          }}
          key={product._id}
          className="singleCard"
        >
          {isAdmin && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "0.5rem",
              }}
            >
              <IconButton
                aria-label="edit"
                sx={{ width: "2rem" }}
                onClick={handleEditProduct}
              >
                <EditIcon />
              </IconButton>
            </Box>
          )}
          <CardMedia
            sx={{ height: 150, backgroundSize: "contain" }}
            image={`${process.env.REACT_APP_API_BASE_URL}${product.imagePath}`}
            title={product.productName}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontSize: "1.2rem", fontWeight: "500" }}
            >
              {product.productName}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: "bold" }}
            >
              &#8362; {product.price.toFixed(2)}
            </Typography>
            {!isAdmin && (
              <Box sx={{ marginTop: "1rem", marginBottom: "-1rem" }}>
                <NumberInput onValueChange={setQuantity} quantity={quantity} />
              </Box>
            )}
          </CardContent>
          {!isAdmin && (
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                size="medium"
                variant="outlined"
                sx={{
                  color: "rgb(103, 32, 180)",
                  borderColor: "rgb(103, 32, 180)",
                  "&:hover": {
                    backgroundColor: "rgb(103, 32, 180)",
                    color: "white",
                  },
                }}
                onClick={() => {
                  addToCart({
                    productId: product._id!,
                    generalPrice: product.price * quantity,
                    quantity: quantity,
                    cartId: cartId,
                  });
                }}
              >
                Add to cart
              </Button>
            </CardActions>
          )}
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default ProductCard;
