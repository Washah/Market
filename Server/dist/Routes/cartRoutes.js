"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./../middleware/auth");
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../controllers/cartController");
const cartRouter = express_1.default.Router();
// add new product
cartRouter.get("/checkShoppingCart/:userId", cartController_1.checkShoppingCart);
cartRouter.post("/addItemToCart/:cartId", auth_1.verifyToken, cartController_1.addItemToCart);
cartRouter.get("/getCartItems/:cartId", auth_1.verifyToken, cartController_1.getCartItems);
cartRouter.put("/updateCartItem", auth_1.verifyToken, cartController_1.updateCartItem);
cartRouter.delete("/deleteCartItem/:cartId/:productId", auth_1.verifyToken, cartController_1.deleteCartItem);
cartRouter.delete("/deleteAllCartItems/:cartId", auth_1.verifyToken, cartController_1.deleteAllCartItems);
exports.default = cartRouter;
