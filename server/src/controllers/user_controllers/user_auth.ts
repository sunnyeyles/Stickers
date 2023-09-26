import express, { Express, Request, Response } from "express";

import { User } from "../../models/model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { envConfig } from "../../config/env_config";
import dotenv from "dotenv";

dotenv.config();

const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

// ////// USER AUTH
export const userAuth = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    // find the user in the database by email
    const user = await User.findOne({ email });
    console.log("user found:", user);

    // check if the user exists
    if (!user) {
      console.log("no user found");
      res.status(401).json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: "Invalid password" });
    }
    // define payload for jwt
    const payload = {
      _id: user._id,
      email: user.email,
    };
    // create jwt
    const token = jwt.sign(
      payload,
      clientSecret,
      {
        expiresIn: envConfig.jwtExpiration,
      },
      (error: Error | null, token: string | undefined) => {
        if (error) {
          console.error("Error creating jwt:", error);
          return res.status(500).json({ message: "Error creating jwt" });
        }
        if (!token) {
          console.error("Token is undefined");
          return res.status(500).json({ message: "Token is undefined" });
        }

        // put the token in a cookie
        res.cookie("chocolateChipCookie", token, {
          httpOnly: true,
          maxAge: 3600000,
        });

        res.status(200).json({
          message: `Thanks for logging in, here's a cookie : ${token}`,
        });
      }
    );
  } catch (error) {
    console.error("Error during authentication:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
