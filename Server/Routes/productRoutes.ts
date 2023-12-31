import express from "express";
import {
  addProduct,
  editProduct,
  getAllProducts,
  searchProducts,
} from "../controllers/productController";
import upload from "../middleware/upload";
import { verifyToken } from "../middleware/auth";

const productRouter = express.Router();

// add new product
productRouter.post(
  "/addProduct",
  upload.single("imagePath"),
  verifyToken,
  addProduct
);
productRouter.get("/getAllProducts", getAllProducts);
productRouter.get("/searchProducts", verifyToken, searchProducts);
productRouter.put(
  "/editProduct/:productId",
  upload.single("imagePath"),
  verifyToken,
  editProduct
);

export default productRouter;
