import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import userRouter from "./Routes/userRoutes";
import categoryRouter from "./Routes/categoryRoutes";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRouter from "./Routes/productRoutes";
import cartRouter from "./Routes/cartRoutes";
import orderRouter from "./Routes/orderRoutes";
dotenv.config();

// Create Server
const server = express();

// Handle CORS
server.use(cors());

//How we send the data back
server.use(express.json());

//Parse the body as JSON
server.use(bodyParser.json());

// Serve images as static resources
server.use("/images", express.static("images"));

// How to use routes
server.use("/user", userRouter);
server.use("/category", categoryRouter);
server.use("/product", productRouter);
server.use("/cart", cartRouter);
server.use("/order", orderRouter);

// for security
server.use(helmet());
server.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Start the server
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    server.listen(process.env.PORT, () =>
      console.log(
        `Connected to MongoDB,Server running on port: ${process.env.PORT}`
      )
    );
  })
  .catch(error => {
    console.log(`Cannot connect to database: ${error.message}`);
    process.exit(1);
  });
