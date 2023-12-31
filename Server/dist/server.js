"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const categoryRoutes_1 = __importDefault(require("./Routes/categoryRoutes"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const productRoutes_1 = __importDefault(require("./Routes/productRoutes"));
const cartRoutes_1 = __importDefault(require("./Routes/cartRoutes"));
const orderRoutes_1 = __importDefault(require("./Routes/orderRoutes"));
dotenv_1.default.config();
// Create Server
const server = (0, express_1.default)();
// Handle CORS
server.use((0, cors_1.default)());
//How we send the data back
server.use(express_1.default.json());
//Parse the body as JSON
server.use(body_parser_1.default.json());
// Serve images as static resources
server.use("/images", express_1.default.static("images"));
// How to use routes
server.use("/user", userRoutes_1.default);
server.use("/category", categoryRoutes_1.default);
server.use("/product", productRoutes_1.default);
server.use("/cart", cartRoutes_1.default);
server.use("/order", orderRoutes_1.default);
// for security
server.use((0, helmet_1.default)());
server.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
// Start the server
mongoose_1.default
    .connect(process.env.MONGO_URL)
    .then(() => {
    server.listen(process.env.PORT, () => console.log(`Connected to MongoDB,Server running on port: ${process.env.PORT}`));
})
    .catch(error => {
    console.log(`Cannot connect to database: ${error.message}`);
    process.exit(1);
});
