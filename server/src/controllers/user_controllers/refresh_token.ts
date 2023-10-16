import jwt from 'jsonwebtoken';
import express, { Express, Request, Response } from 'express'
import { User } from '../../models/model'
import dotenv from 'dotenv'
import jwt_decode from "jwt-decode";
import { ITokenData } from '../../types';

dotenv.config()

// ////// USER Auth refresh
// to check if User still has the cookie/token
export const refreshToken = async (req: Request, res: Response) => {
  //we expecting a cookie with the request
  const cookies = req.cookies
  //console.log('cookie jwt ', cookies.jwt)

  try {
    if (!cookies?.jwt) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const refreshToken = cookies.jwt
    //console.log('refreshToken', refreshToken)

    // than we need to verify this token
    const decoded: ITokenData = jwt_decode(refreshToken)
    //console.log('decoded token: ', decoded)

    const { _id } = decoded._id;
    const foundUser = await User.findOne(_id).exec()

    if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

    //issue a new accessToken if the refreshToken is valid
    const accessToken = jwt.sign(
      {
        "UserInfo": {
          "_id": foundUser._id,
          "email": foundUser.email
        }
      },
      `${process.env.ACCESS_TOKEN_SECRET}`,
      { expiresIn: "7min" }
    )

    res.json({ accessToken })

  } catch (error) {
    console.error("Error refresh Token:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}