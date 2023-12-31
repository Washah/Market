import express from "express";
import {
  createOrder,
  getLastOrder,
  getOrdersAmount,
  getOverbookedDates,
} from "../controllers/orderController";
import { verifyToken } from "../middleware/auth";

const orderRouter = express.Router();

// create new order
orderRouter.post("/createOrder", verifyToken, createOrder);
orderRouter.get("/getOverbookedDates", verifyToken, getOverbookedDates);
orderRouter.get("/getOrdersAmount", getOrdersAmount);
orderRouter.get("/getLastOrder/:userId", verifyToken, getLastOrder);

export default orderRouter;
