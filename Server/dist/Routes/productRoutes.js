"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const upload_1 = __importDefault(require("../middleware/upload"));
const auth_1 = require("../middleware/auth");
const productRouter = express_1.default.Router();
// add new product
productRouter.post("/addProduct", upload_1.default.single("imagePath"), auth_1.verifyToken, productController_1.addProduct);
productRouter.get("/getAllProducts", productController_1.getAllProducts);
productRouter.get("/searchProducts", auth_1.verifyToken, productController_1.searchProducts);
productRouter.put("/editProduct/:productId", upload_1.default.single("imagePath"), auth_1.verifyToken, productController_1.editProduct);
exports.default = productRouter;
