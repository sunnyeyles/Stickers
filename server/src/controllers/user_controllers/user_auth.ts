import jwt from 'jsonwebtoken';
import express, { Express, Request, Response } from 'express'
import { User } from '../../models/model'
import bcrypt from 'bcrypt'
import { envConfig } from '../../config/env_config'
import dotenv from 'dotenv'

dotenv.config()

const clientSecret = process.env.GOOGLE_CLIENT_SECRET

// ////// USER AUTH
export const userAuth = async (req: Request, res: Response) => {
  const { email, password } = req.body
  console.log(req.body)
  try {
    // find the user in the database by email
    const user = await User.findOne({ email })
    console.log('user found:', user)
    const userName = user.userName
    const userEmail = user.email

    // check if the user exists
    if (!user) {
      console.log('no user found')
      res.status(401).json({ success: false, message: 'User not found' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: 'Invalid password' })
    }
    // define payload for accessToken
    //this info is inserted into accessToken
    // we need to destructure this token when we return that info in the frontend
    //frontend has the token in state until we decrypt it and pull this info out
    const payloadToken = {
      _id: user._id,
      email: user.email,
    }
    // create accessToken
    const accessToken = jwt.sign(
      payloadToken,
      //google auth
      //clientSecret,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '3s' },
    )

    console.log("accessToken", accessToken)

    // create refreshToken
    const refreshToken = jwt.sign(
      payloadToken,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: envConfig.jwtRefreshExpiration }
    )
    console.log("refreshToken", refreshToken)

    // create secure cookie with refreshToken
    res.cookie('jwt', refreshToken, {
      httpOnly: true, // accessible only by web server 
      secure: true, //https
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry match refreshToken
    })

    //we sending back accessToken containing userId and email
    res.json({ accessToken, userName, userEmail })
  } catch (error) {
    console.error('Error during authentication:', error)
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' })
  }
}


