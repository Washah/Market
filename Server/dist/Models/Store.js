"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.CartItemModel = exports.ShoppingCartModel = exports.ProductModel = exports.CategoryModel = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    idNumber: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    city: { type: String, required: false },
    street: { type: String, required: false },
    role: { type: String, required: true, default: "user" },
});
const CategorySchema = new mongoose_1.Schema({
    categoryName: { type: String, required: true },
});
const ProductSchema = new mongoose_1.Schema({
    productName: { type: String, required: true },
    categoryId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Category", required: true },
    price: { type: Number, required: true },
    imagePath: { type: String, required: true },
});
const ShoppingCartSchema = new mongoose_1.Schema({
    customerId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
});
const CartItemSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    generalPrice: { type: Number, required: true },
    cartId: { type: mongoose_1.Schema.Types.ObjectId, ref: "ShoppingCart", required: true }, // Foreign key referencing ShoppingCart
});
const OrderSchema = new mongoose_1.Schema({
    customerId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", default: null },
    cartId: { type: mongoose_1.Schema.Types.ObjectId, ref: "ShoppingCart", required: true },
    finalPrice: { type: Number, required: true },
    deliveryCity: { type: String, required: true },
    deliveryStreet: { type: String, required: true },
    deliveryDate: { type: Date, required: true },
    orderExecutionDate: { type: Date, required: true, default: Date.now },
    paymentMethodLast4Digits: { type: String, required: true },
});
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
exports.CategoryModel = (0, mongoose_1.model)("Category", CategorySchema);
exports.ProductModel = (0, mongoose_1.model)("Product", ProductSchema);
exports.ShoppingCartModel = (0, mongoose_1.model)("ShoppingCart", ShoppingCartSchema);
exports.CartItemModel = (0, mongoose_1.model)("CartItem", CartItemSchema);
exports.OrderModel = (0, mongoose_1.model)("Order", OrderSchema);
