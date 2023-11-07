import { Request, Response } from 'express'
import { User } from '../../models/model'

export const updateAddress = async (req: Request, res: Response) => {
  const { _id, address } = req.body
  console.log(req.body)
  try {
    const user = await User.findByIdAndUpdate(_id, { address: address })
    res.json({ message: 'User Address Updated!', userDetails: user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update address' })
  }
}
