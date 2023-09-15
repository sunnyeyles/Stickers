import express, { Express, Request, Response } from "express";

import { User } from "../models/model";

import bcrypt from "bcrypt";

//////// CREATE NEW USER
export const createNewUser = async (req: Request, res: Response) => {
  const newUser = req.body;
  console.log(req.body);
  try {
    // Hash the user's password before saving it to the database
    const saltRounds = 10;
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
    console.error("Error creating user:", error);
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
    } else {
      return res.status(200).json({ success: true, "user:": user });
    }
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
    const { currentPassword, newPassword, _id } = req.body;
    // Find the user by their ID
    const user = await User.findById(_id);
    // If the user is not found, return a 404 response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Verify that the current password matches the user's actual password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    // If the current password is incorrect, return a 401 response
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }
    // Update the user's password
    user.password = newPassword;
    await user.save();

    // Return a 200 response with a success message and the updated user object
    res.status(200).json({ message: "Password updated successfully", user });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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
