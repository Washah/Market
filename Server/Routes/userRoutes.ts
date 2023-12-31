import express from "express";
import { checkEmailId, login, register } from "../controllers/userController";

const userRouter = express.Router();

// register new user in database
userRouter.post("/register", register);

// handle login
userRouter.post("/login", login);

// check email and id
userRouter.get("/checkEmailId/:email/:idNumber", checkEmailId);

export default userRouter;
