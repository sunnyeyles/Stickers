import express, { Express, Request, Response } from "express";

import { User } from "../models/model";

import bcrypt from "bcrypt";

///// GET USER DETAILS
export const getUserDetailsByEmail = async (req: Request, res: Response) => {
  const { email } = req.query;
  try {
    // Find the user in the database by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(201).json(user);
  } catch (error) {
    console.error("Error during authentication:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

////// GET ALL USERS
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // find all users in database
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ success: false, message: "Nothing Found" });
    }
    res.status(201).json(users);
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
