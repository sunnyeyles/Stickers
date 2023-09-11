import express, { Express, Request, Response } from "express";

import { User, Item } from "../models/model";

import bcrypt from "bcrypt";

const app: Express = express();

//////// CREATE NEW USER

export const createNewUser = async (req: Request, res: Response) => {
  const newUser = req.body;
  console.log(req.body);
  try {
    // Hash the user's password before saving it to the database
    const saltRounds = 10; // Set the number of salt rounds
    if (!newUser.password) {
      throw new Error("Password is required");
    }

    const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
    newUser.password = hashedPassword;

    // Create and save the user to the database
    await User.create(newUser);

    // Send a success response with the newly created user data
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error); // Log the error for debugging
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

/////// CHANGE USER PASSWORD
export const changeUserPassword = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { newPassword } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
