"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if (!token)
            return res.status(401).json({ error: "Access denied" });
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
        }
        const verified = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        next();
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
exports.verifyToken = verifyToken;
