"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProducts = exports.editProduct = exports.getAllProducts = exports.addProduct = void 0;
const Store_1 = require("../Models/Store");
const fs_1 = __importDefault(require("fs"));
// Function to add a new product to the database
const addProduct = async (req, res) => {
    try {
        // Extract the product details from the request body
        const product = req.body;
        const { productName } = product;
        // The image file path is obtained from the uploaded file
        const imagePath = req.file.path;
        // Check if the product with the same name already exists
        const existingProduct = await Store_1.ProductModel.findOne({ productName });
        if (existingProduct) {
            return res.status(400).json({ message: "Product already exists" });
        }
        // Create a new product model instance and save it in the database
        const newProduct = new Store_1.ProductModel({ ...product, imagePath });
        await newProduct.save();
        // Respond with a status of 201 (Created) and the new product details
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.addProduct = addProduct;
// Function to get all products from the database
const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Store_1.ProductModel.find();
        res.status(200).json(allProducts);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllProducts = getAllProducts;
// Function to edit a product in the database
const editProduct = async (req, res) => {
    var _a;
    const { productId } = req.params;
    const product = req.body;
    const imagePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    try {
        const existingProduct = await Store_1.ProductModel.findOne({ _id: productId });
        if (!existingProduct) {
            return res.status(404).json({ message: "product not found" });
        }
        if (imagePath &&
            existingProduct.imagePath &&
            fs_1.default.existsSync(existingProduct.imagePath)) {
            fs_1.default.unlinkSync(existingProduct.imagePath);
        }
        const updatedProduct = await Store_1.ProductModel.findByIdAndUpdate(productId, {
            ...product,
            imagePath,
        }, { new: true });
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.editProduct = editProduct;
// function to search for specific products
const searchProducts = async (req, res) => {
    const { productName } = req.query;
    try {
        const searchedProducts = await Store_1.ProductModel.find({
            productName: { $regex: productName, $options: "i" },
        });
        if (searchedProducts.length === 0) {
            return res.status(404).json({ message: "No products found." });
        }
        res.status(200).json(searchedProducts);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.searchProducts = searchProducts;
