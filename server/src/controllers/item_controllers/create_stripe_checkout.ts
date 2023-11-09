import { IItem } from '../../models/model_types';
import express, { Express, Request, Response } from "express";
import Stripe from "stripe"
import dotenv from 'dotenv'
import { envConfig } from '../../config/env_config'

const stripe = new Stripe(process.env.STRIPE_KEY)
dotenv.config()

export const createCheckoutSession = async (req: Request, res: Response) => {
  console.log("req.body from server", req.body)
  const { userId, token, shoppingCart } = req.body
  const line_items = shoppingCart.map((item : IItem) => {
    return {
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.itemName,
          //images: [item.imagePath],
          description: item.itemDescription,
          metadata: {
            id: item._id
          }
        },
        unit_amount: (parseFloat(item.itemPrice)) * 100,
      },
      quantity: item.numOfItems,
    }
  })
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    //if payment is successful, where should the payment checkout takes us to
    success_url: `${envConfig.clientUrl}/confirmation`,
    cancel_url: `${envConfig.clientUrl}/cart`,
  })
  res.send({ url: session.url })
}