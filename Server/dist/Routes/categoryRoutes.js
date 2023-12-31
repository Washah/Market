"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const auth_1 = require("../middleware/auth");
const categoryRouter = express_1.default.Router();
// get all categories
categoryRouter.get("/getAllCategories", auth_1.verifyToken, categoryController_1.getAllCategories);
exports.default = categoryRouter;
