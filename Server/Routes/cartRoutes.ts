import { verifyToken } from "./../middleware/auth";
import express from "express";
import {
  addItemToCart,
  checkShoppingCart,
  deleteAllCartItems,
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from "../controllers/cartController";

const cartRouter = express.Router();

// add new product
cartRouter.get("/checkShoppingCart/:userId", checkShoppingCart);
cartRouter.post("/addItemToCart/:cartId", verifyToken, addItemToCart);
cartRouter.get("/getCartItems/:cartId", verifyToken, getCartItems);
cartRouter.put("/updateCartItem", verifyToken, updateCartItem);
cartRouter.delete(
  "/deleteCartItem/:cartId/:productId",
  verifyToken,
  deleteCartItem
);
cartRouter.delete(
  "/deleteAllCartItems/:cartId",
  verifyToken,
  deleteAllCartItems
);

export default cartRouter;
