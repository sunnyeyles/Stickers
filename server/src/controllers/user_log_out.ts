import express, { Express, Request, Response } from "express";

import { User } from "../models/model";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

export const userLogOut = async (req: Request, res: Response) => {
  //   const token = req.headers.authorization?.split(" ")[1];
  console.log(req.body);

  // Check if the token is valid
  //   if (!token) {
  //     return res
  //       .status(401)
  //       .json({ success: false, message: "Token not provided" });
  //   }

  try {
    // Verify the token (this will throw an error if the token is invalid)
    // jwt.verify(token, "your-secret-key");

    // Respond with a success message
    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    // Handle token verification error (e.g., expired token)
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
