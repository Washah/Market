"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmailId = exports.login = exports.register = void 0;
const Store_1 = require("../Models/Store");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Function to add a new user to the database
const register = async (req, res) => {
    const newUser = req.body;
    // Generate a new salt and hash the user's password with it
    const salt = await bcryptjs_1.default.genSalt(10);
    newUser.password = await bcryptjs_1.default.hash(newUser.password, salt);
    const newCustomer = new Store_1.UserModel(newUser);
    newCustomer
        .save()
        .then(customer => {
        // Generate a new JWT token for the user
        const token = jsonwebtoken_1.default.sign({ id: customer._id, email: customer.email }, process.env.SECRET_KEY);
        res.status(201).json({
            token,
            user: {
                firstName: customer.firstName,
                lastName: customer.lastName,
                role: customer.role,
                city: customer.city,
                street: customer.street,
                _id: customer._id,
            },
        });
    })
        .catch(error => {
        res.status(500).json({ error: error.message });
    });
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Retrieve user from the database
        const customer = await Store_1.UserModel.findOne({ email });
        if (!customer) {
            return res.status(400).json({
                message: "Invalid credentials. Please check your email and password.",
            });
        }
        // Check if the provided password is correct
        const isPasswordValid = await bcryptjs_1.default.compare(password, customer.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid credentials. Please check your email and password.",
            });
        }
        // Generate a new JWT token
        const token = jsonwebtoken_1.default.sign({ id: customer._id, email: customer.email }, process.env.SECRET_KEY);
        res.status(200).json({
            token,
            user: {
                firstName: customer.firstName,
                lastName: customer.lastName,
                role: customer.role,
                city: customer.city,
                street: customer.street,
                _id: customer._id,
            },
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.login = login;
// check if email or idNumber already exists in database
const checkEmailId = async (req, res) => {
    const email = req.params.email;
    const idNumber = +req.params.idNumber;
    try {
        // Check if the ID number already exists in the database
        const existingIdNumber = await Store_1.UserModel.findOne({ idNumber: idNumber });
        // Check if the email already exists in the database
        const existingEmail = await Store_1.UserModel.findOne({ email: email });
        if (existingIdNumber) {
            return res.status(400).json({
                message: "The provided ID number is already in use. Please use a different ID number.",
            });
        }
        else if (existingEmail) {
            return res.status(400).json({
                message: "The provided email is already in use. Please use a different email.",
            });
        }
        else {
            return res.status(200).json({
                exists: false,
            });
        }
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
exports.checkEmailId = checkEmailId;
