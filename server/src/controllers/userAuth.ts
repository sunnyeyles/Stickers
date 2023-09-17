import express, { Express, Request, Response } from "express";

import { User } from "../models/model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { envConfig } from "../config/env_config";

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

    // define payload for token
    const payload = {
      _id: user._id,
      email: user.email,
    };


    // Send success message with user information and token
    jwt.sign(
      payload,
      envConfig.jwtSecret,
      { expiresIn: envConfig.jwtExpiration },
      (err: Error | null, token: string) => {
        if (err) {
          console.error("JWT token creation error:", err);
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }
        // Send the token back to the frontend upon successful authentication
        return res.status(200).json({ success: true, user, token });
      }
    );
  } catch (error) {
    console.error("Error during authentication:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
