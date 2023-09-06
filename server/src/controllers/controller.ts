import express, { Express, Request, Response } from "express";

import { User, Item } from "../models/model";

import bcrypt from "bcrypt";
const app: Express = express();

export const createNewUser = async (req: Request, res: Response) => {
  const newUser = req.body;
  try {
    // Hash the user's password before saving it to the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
    newUser.password = hashedPassword;
    // Create and save the user to the database
    await User.create(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

////// USER AUTH

export const userAuth = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    // Create a payload for the JWT token
    const payload = {
      _id: user._id,
      email: user.email,
    };
  } catch (error) {
    console.error("Error during authentication:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
