"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastOrder = exports.getOrdersAmount = exports.getOverbookedDates = exports.createOrder = void 0;
const Store_1 = require("../Models/Store");
// Function to create an order in database
const createOrder = async (req, res) => {
    const orderDetails = req.body;
    try {
        const newOrder = new Store_1.OrderModel(orderDetails);
        await newOrder.save();
        // open new shopping cart after order has been completed
        const newShoppingCart = new Store_1.ShoppingCartModel({
            customerId: newOrder.customerId,
        });
        await newShoppingCart.save();
        res.status(201).json({ newOrder, newShoppingCart });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createOrder = createOrder;
// get all the overbooked dates(more than 3 orders per date)
const getOverbookedDates = async (req, res) => {
    try {
        const overbookedDates = await Store_1.OrderModel.aggregate([
            {
                $group: {
                    _id: "$deliveryDate",
                    count: { $sum: 1 },
                },
            },
            {
                $match: {
                    count: { $gte: 3 },
                },
            },
        ]);
        const dates = overbookedDates.map(item => item._id);
        res.status(200).json(dates);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getOverbookedDates = getOverbookedDates;
// get the amount of all orders
const getOrdersAmount = async (req, res) => {
    try {
        const orderCount = await Store_1.OrderModel.countDocuments();
        res.status(200).json(orderCount);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getOrdersAmount = getOrdersAmount;
// get last order of user by user id
const getLastOrder = async (req, res) => {
    const { userId } = req.params;
    try {
        const lastOrder = await Store_1.OrderModel.findOne({ customerId: userId })
            .sort({
            orderExecutionDate: -1,
        })
            .select("orderExecutionDate -_id");
        if (!lastOrder) {
            return res.status(200).json({ message: "No order found for this user." });
        }
        res.status(200).json(lastOrder);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getLastOrder = getLastOrder;
