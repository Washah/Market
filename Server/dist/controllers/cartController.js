"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllCartItems = exports.deleteCartItem = exports.updateCartItem = exports.getCartItems = exports.addItemToCart = exports.checkShoppingCart = void 0;
const Store_1 = require("../Models/Store");
// Function to check if user has an cart and if no create it
const checkShoppingCart = async (req, res) => {
    const { userId } = req.params;
    try {
        // use the last created shopping cart
        const latestShoppingCart = await Store_1.ShoppingCartModel.findOne({
            customerId: userId,
        }).sort({ createdAt: -1 }); // sorting in descending order
        if (latestShoppingCart) {
            res.status(200).json(latestShoppingCart);
        }
        else {
            const newShoppingCart = new Store_1.ShoppingCartModel({ customerId: userId });
            await newShoppingCart.save();
            res.status(201).json(newShoppingCart);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.checkShoppingCart = checkShoppingCart;
// function to add new item to the cart
const addItemToCart = async (req, res) => {
    const { cartId } = req.params;
    const item = req.body;
    try {
        const shoppingCart = await Store_1.ShoppingCartModel.findOne({ _id: cartId });
        if (!shoppingCart) {
            return res.status(400).json({ message: "Shopping cart not found" });
        }
        const existingCartItem = await Store_1.CartItemModel.findOne({
            cartId: cartId,
            productId: item.productId,
        });
        if (existingCartItem) {
            existingCartItem.quantity += item.quantity;
            existingCartItem.generalPrice += item.generalPrice;
            await existingCartItem.save();
            res.status(200).json(existingCartItem);
        }
        else {
            const newCartItem = new Store_1.CartItemModel({ ...item, cartId: cartId });
            await newCartItem.save();
            res.status(201).json(newCartItem);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.addItemToCart = addItemToCart;
// get all cart items with cartId
const getCartItems = async (req, res) => {
    const { cartId } = req.params;
    try {
        const cartItems = await Store_1.CartItemModel.find({ cartId: cartId });
        if (!cartItems) {
            return res.status(404).json({ message: "No items in this cart" });
        }
        res.status(200).json(cartItems);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getCartItems = getCartItems;
// update cart item
const updateCartItem = async (req, res) => {
    const item = req.body;
    try {
        const cartItem = await Store_1.CartItemModel.findOne({
            cartId: item.cartId,
            productId: item.productId,
        });
        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        cartItem.quantity = item.quantity;
        cartItem.generalPrice = item.generalPrice;
        await cartItem.save();
        res.status(200).json(cartItem);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateCartItem = updateCartItem;
// delete item from cart
const deleteCartItem = async (req, res) => {
    const { cartId, productId } = req.params;
    try {
        const cartItem = await Store_1.CartItemModel.findOne({
            cartId: cartId,
            productId: productId,
        });
        if (!cartItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        await Store_1.CartItemModel.deleteOne({ _id: cartItem._id });
        res.status(200).json(cartItem);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteCartItem = deleteCartItem;
// delete all cart items
const deleteAllCartItems = async (req, res) => {
    const { cartId } = req.params;
    try {
        const cartItems = await Store_1.CartItemModel.find({ cartId: cartId });
        if (cartItems.length === 0)
            return res.status(404).json({ message: "No items in this cart" });
        await Store_1.CartItemModel.deleteMany({ cartId: cartId });
        res.status(200).json({ message: "All cart items are deleted" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteAllCartItems = deleteAllCartItems;
