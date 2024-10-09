import express, { Router } from 'express'
import { Request, Response } from 'express'
import { getItemsInCategory } from '../controllers/item_controllers/get_items_in_category'
import { getSpecificItem } from '../controllers/item_controllers/get_specific_item'
import { getReducedItems } from '../controllers/item_controllers/get_reduced_items'
import { getAllItemsFromDb } from '../controllers/item_controllers/get_all_items_from_db'
import { getItemsByCategory } from '../controllers/item_controllers/get_items_by_category'
import { verifyCheckout } from '../controllers/item_controllers/verify_checkout'
import { uploadProfileImage } from '../controllers/user_controllers/upload_profile_image'
import { upload } from '../middleware/upload'

const itemRouter: Router = express.Router()

itemRouter.get('/get-all-items', getAllItemsFromDb)
itemRouter.get('/get-items-by-category', getItemsByCategory)
itemRouter.get(
  '/get-items-in-category/:itemCategory',
  (req: Request, res: Response) => {
    const itemCategory = req.params.itemCategory as string
    console.log('itemCategory:', itemCategory)

    if (typeof itemCategory !== 'string') {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid parameters' })
    }
    getItemsInCategory(res, itemCategory)
  }
)
itemRouter.get('/get-specific-item/:itemId', getSpecificItem)
itemRouter.get('/reduced', getReducedItems)
itemRouter.post('/verify-checkout', verifyCheckout)

itemRouter.post(
  '/upload-profile-image',
  upload.single('profileImage'),
  uploadProfileImage
)

export default itemRouter
