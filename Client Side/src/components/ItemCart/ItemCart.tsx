import { CartItem } from "../../models/CartItem";
import "./ItemCart.css";
import NumberInput from "../NumberInput";
import React from "react";
import { Button, Grow, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useProductState } from "../../hooks/useProductState";
import { useCartItemApi } from "../../hooks/useCartItemApi";
import { useCartState } from "../../hooks/useCartState";
import { motion } from "framer-motion";

type cardProps = {
  item: CartItem;
  searchQuery: String;
};

const ItemCart: React.FC<cardProps> = ({ item, searchQuery }) => {
  // custom hook to get products from the Redux store
  const { products } = useProductState();
  // custom hook to get finishedOrder state from the Redux store
  const { finishedOrder } = useCartState();

  // Find the product associated with this cart item
  const product = products.find(product => product._id === item.productId);

  // get the functions from custom hook
  const { handleDeleteCartItem, handleUpdateItem } = useCartItemApi();

  // Local state to track quantity and whether to show the update button
  const [quantity, setQuantity] = React.useState(item.quantity);
  const [showButton, setShowButton] = React.useState(false);

  // Toggle the visibility of the update button based on quantity change
  const handleQuantityChange = (newValue: number) => {
    setShowButton(newValue !== item.quantity);
  };

  React.useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  // function to highlight the searched product
  const highlightedName = product?.productName
    .split(new RegExp(`(${searchQuery})`, "gi"))
    .map((str, i) => {
      if (str.toLowerCase() === searchQuery.toLowerCase() && searchQuery) {
        return (
          <span key={i} style={{ backgroundColor: "yellow" }}>
            {str}
          </span>
        );
      }
      return str;
    });

  return (
    // Animation properties for cart item entry/exit
    <motion.div
      className="cartItem"
      initial={{ opacity: 0, x: -350 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -350 }}
      transition={{
        x: { duration: 0.3, ease: "linear" },
        opacity: { duration: 0.3 },
      }}
    >
      <div className="cartItem__imageName">
        <h3>{highlightedName}</h3>
        {!finishedOrder && (
          <div className="cartItem__delete">
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => handleDeleteCartItem(item.cartId, item.productId)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        )}
        <img
          src={`${process.env.REACT_APP_API_BASE_URL}${product?.imagePath}`}
          alt={product?.productName}
          className="cartItem__image"
        />
      </div>
      {showButton && !finishedOrder && (
        <div className="updateButton">
          <Grow in timeout={1000}>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              size="small"
              color="success"
              sx={{
                padding: "2px 5px",
                fontSize: "0.7rem",
              }}
              onClick={() => {
                handleUpdateItem(item, quantity, product!.price);
                setShowButton(false);
              }}
            >
              Update
            </Button>
          </Grow>
        </div>
      )}
      <div className="cartItem__price">
        <p> Price: &#8362; {product?.price} </p>
        {!finishedOrder ? (
          <div className="numberInputWrapper">
            <NumberInput
              onValueChange={setQuantity}
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
            />
          </div>
        ) : (
          <div>Amount: {item.quantity}</div>
        )}
        <p> Total Price: &#8362; {item.generalPrice.toFixed(2)}</p>
      </div>
    </motion.div>
  );
};

export default ItemCart;
