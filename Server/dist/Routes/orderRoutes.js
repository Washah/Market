"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const auth_1 = require("../middleware/auth");
const orderRouter = express_1.default.Router();
// create new order
orderRouter.post("/createOrder", auth_1.verifyToken, orderController_1.createOrder);
orderRouter.get("/getOverbookedDates", auth_1.verifyToken, orderController_1.getOverbookedDates);
orderRouter.get("/getOrdersAmount", orderController_1.getOrdersAmount);
orderRouter.get("/getLastOrder/:userId", auth_1.verifyToken, orderController_1.getLastOrder);
exports.default = orderRouter;
