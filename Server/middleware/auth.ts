import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: any;
}

export const verifyToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access denied" });
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    const verified = jwt.verify(token, process.env.SECRET_KEY!);
    req.user = verified;
    next();
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
