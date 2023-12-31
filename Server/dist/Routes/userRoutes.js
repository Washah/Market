"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userRouter = express_1.default.Router();
// register new user in database
userRouter.post("/register", userController_1.register);
// handle login
userRouter.post("/login", userController_1.login);
// check email and id
userRouter.get("/checkEmailId/:email/:idNumber", userController_1.checkEmailId);
exports.default = userRouter;
