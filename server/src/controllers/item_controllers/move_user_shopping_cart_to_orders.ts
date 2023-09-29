import { Request, Response } from 'express'
import { User } from '../../models/model'

export const moveCartToOrders = async (req: Request, res: Response) => {
  const { _id } = req.body
  try {
    const user = await User.findById(_id)
    if (!user) {
      return res.status(500).json({ message: 'Cannot find user' })
    }
    const shoppingCart = user.shoppingCart
    if (!shoppingCart) {
      return res
        .status(500)
        .json({ message: "There's no shopping cart for this user" })
    }
    // move shopping cart items to user's orders
    user.orders = shoppingCart
    // clear users shopping cart
    user.shoppingCart = []
    // save the changes
    await user.save()
    return res.status(200).json({ message: 'User orders updated' })
  } catch (error) {
    console.error('Error during moveCartToOrders:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
