import express, { Express, Request, Response } from 'express'
import { User, Item } from '../../models/model'

export const getUserCart = async (req: Request, res: Response) => {
  const { email, items } = req.body
  const user = User.findOne({ email })
  const cart = (await user).shoppingCart
  if (!user) {
    throw new Error('User not found')
  }
  res.status(201).json({
    'The users cart contains:': cart,
  })
}
