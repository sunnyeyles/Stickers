import { IItem } from '../../models/model_types';
import express, { Express, Request, Response } from "express";
import Stripe from "stripe"
import dotenv from 'dotenv'
import { envConfig } from '../../config/env_config'

const stripeKey = new Stripe(process.env.STRIPE_KEY)
dotenv.config()

export const createCheckoutSession = async (req: Request, res: Response) => {
  const { userId, shoppingCart } = req.body
  console.log("shopping cart", shoppingCart)

  const customer = await stripeKey.customers.create({
    metadata: {
      userId: userId.toString(),
      cart: JSON.stringify(shoppingCart)
    }
  })

  const line_items = shoppingCart.map((item: IItem) => {
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
  const session = await stripeKey.checkout.sessions.create({
    line_items,
    customer: customer.id,
    mode: 'payment',
    //if payment is successful, where should the payment checkout takes us to
    success_url: `${envConfig.clientUrl}/confirmation`,
    cancel_url: `${envConfig.clientUrl}/cart`,
  })
  res.send({ url: session.url })
}

