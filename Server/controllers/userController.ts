import { Request, Response } from "express";
import { User, UserModel } from "../Models/Store";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

// Function to add a new user to the database
export const register = async (req: Request, res: Response) => {
  const newUser: User = req.body;

  // Generate a new salt and hash the user's password with it
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  const newCustomer = new UserModel(newUser);
  newCustomer
    .save()
    .then(customer => {
      // Generate a new JWT token for the user
      const token = jwt.sign(
        { id: customer._id, email: customer.email },
        process.env.SECRET_KEY!
      );
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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // Retrieve user from the database
    const customer = await UserModel.findOne({ email });
    if (!customer) {
      return res.status(400).json({
        message: "Invalid credentials. Please check your email and password.",
      });
    }
    // Check if the provided password is correct
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid credentials. Please check your email and password.",
      });
    }
    // Generate a new JWT token
    const token = jwt.sign(
      { id: customer._id, email: customer.email },
      process.env.SECRET_KEY!
    );
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
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// check if email or idNumber already exists in database
export const checkEmailId = async (req: Request, res: Response) => {
  const email = req.params.email;
  const idNumber = +req.params.idNumber;
  try {
    // Check if the ID number already exists in the database
    const existingIdNumber = await UserModel.findOne({ idNumber: idNumber });
    // Check if the email already exists in the database
    const existingEmail = await UserModel.findOne({ email: email });
    if (existingIdNumber) {
      return res.status(400).json({
        message:
          "The provided ID number is already in use. Please use a different ID number.",
      });
    } else if (existingEmail) {
      return res.status(400).json({
        message:
          "The provided email is already in use. Please use a different email.",
      });
    } else {
      return res.status(200).json({
        exists: false,
      });
    }
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
