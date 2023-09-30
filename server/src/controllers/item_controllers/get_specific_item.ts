import { Request, Response } from 'express'
import { Item } from '../../models/model'
import fs from 'fs'

export const getSpecificItem = async (req: Request, res: Response) => {
  // const { _id } = req.params
  const { _id } = req.body
  try {
    const item = await Item.findOne(_id)
    console.log(item)
    if (!item) {
      return res.status(404).json({ success: false, message: 'Nothing found' })
    }

    const imagePath = item.imagePath
    if (!imagePath) {
      return res
        .status(404)
        .json({ success: false, message: 'Image not found' })
    }
    const imageUrl = item.imagePath
    const responseObj = {
      success: true,
      message: 'Item found',
      item,
      imageUrl,
    }

    res.status(200).json(responseObj)
  } catch (error) {
    console.error('Error:', error)
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' })
  }
}

// import { Request, Response } from 'express'
// import { Item } from '../../models/model'
// import fs from 'fs'

// export const getSpecificItem = async (req: Request, res: Response) => {
//   const { _id } = req.params
//   try {
//     const item = await Item.findById(_id)
//     if (!item) {
//       res.status(404).json({ success: false, message: 'Nothing found' })
//     }
//     res.status(201).json(item)

//     const imagePath = item.imagePath
//     if (!imagePath) {
//       return res
//         .status(404)
//         .json({ success: false, message: 'Image not found' })
//     }
//     // set content header
//     res.setHeader('Content-Type', 'image/jpeg')
//     const imageStream = fs.createReadStream(imagePath)
//     // pipe the image stream to the response
//     imageStream.pipe(res)
//   } catch (error) {
//     console.error('Error:', error)
//     return res
//       .status(500)
//       .json({ success: false, message: 'Internal server error' })
//   }
// }
