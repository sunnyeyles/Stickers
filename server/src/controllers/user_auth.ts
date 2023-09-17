import express, { Express, Request, Response } from "express";

import { User } from "../models/model";

import bcrypt from "bcrypt";

// ////// USER AUTH
export const userAuth = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    // Find the user in the database by email
    const user = await User.findOne({ email });
    console.log("user found:", user);

    // Check if the user exists
    if (!user) {
      console.log("no user found");
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Check if the password is invalid
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    // Send success message with user information
    return res.status(201).json({ success: true, user });
  } catch (error) {
    console.error("Error during authentication:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
