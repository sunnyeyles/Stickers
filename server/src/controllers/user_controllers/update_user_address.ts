// import { User } from './../../models/model'
// import express, { Request, Response } from 'express'

// export const updateUserAddress = async (req: Request, res: Response) => {
//   const { _id, address } = req.body
//   console.log('the request body!!!!:', req.body)
//   try {
//     const user = await User.findOne(_id)
//     console.log(user)
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'No user found' })
//     }
//     res.status(200).json(user.address)
//   } catch (error) {
//     console.error('Error:', error)
//     return res
//       .status(500)
//       .json({ success: false, message: 'Internal server error' })
//   }
// }
import { User } from './../../models/model'
import express, { Request, Response } from 'express'

export const updateUserAddress = async (req: Request, res: Response) => {
  const { _id, address } = req.body
  console.log('the request body:', req.body)

  try {
    const user = await User.findOne({ _id })

    if (!user) {
      return res.status(404).json({ success: false, message: 'No user found' })
    }

    user.address = address
    await user.save()

    res.status(200).json(user.address)
  } catch (error) {
    console.error('Error:', error)
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' })
  }
}
