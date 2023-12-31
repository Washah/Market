"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories = void 0;
const Store_1 = require("../Models/Store");
//function to get all categories from database
const getAllCategories = async (req, res) => {
    try {
        const allCategories = await Store_1.CategoryModel.find();
        res.status(200).json(allCategories);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllCategories = getAllCategories;
