import { Badge, IconButton } from "@mui/material";
import { useCartState } from "../hooks/useCartState";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CartIcon = () => {
  const { cartItems } = useCartState();

  return (
    <>
      <IconButton color="secondary">
        <Badge badgeContent={cartItems.length} color="error">
          <ShoppingCartIcon fontSize="large" />
        </Badge>
      </IconButton>
    </>
  );
};

export default CartIcon;
