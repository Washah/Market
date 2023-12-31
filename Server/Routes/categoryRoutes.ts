import express from "express";
import { getAllCategories } from "../controllers/categoryController";
import { verifyToken } from "../middleware/auth";

const categoryRouter = express.Router();

// get all categories
categoryRouter.get("/getAllCategories", verifyToken, getAllCategories);

export default categoryRouter;
