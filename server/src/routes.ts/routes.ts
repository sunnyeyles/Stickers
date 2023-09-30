import express, { Router } from 'express'
import { Request, Response } from 'express'
import {
  getUserDetailsByEmail,
  getAllUsers,
} from '../controllers/user_controllers/users_controller'
import { createNewUser } from '../controllers/user_controllers/create_user'
import { changeUserPassword } from '../controllers/user_controllers/change_password'
import { userAuth } from '../controllers/user_controllers/user_auth'
import { refreshToken } from '../controllers/user_controllers/refresh_token'
import { userLogOut } from '../controllers/user_controllers/user_log_out'
import { getItemsInCategory } from '../controllers/item_controllers/get_items_in_category'
import { getReducedItems } from '../controllers/item_controllers/get_reduced_items'
import {
  getAllItemsFromDb,
  getItemsByCategory,
} from '../controllers/user_controllers/items_controller'
import { verifyCheckout } from '../controllers/item_controllers/verify_checkout'
import { handleGoogleAuthCallback } from '../middleware/google_auth'
import { moveCartToOrders } from '../controllers/item_controllers/move_user_shopping_cart_to_orders'
import passport from 'passport'
import { verifyJWT } from '../middleware/verifyJWT'

const router: Router = express.Router()

//// USER ENDPOINTS
router.post('/user/create-user',createNewUser) //register
router.post('/user/authenticate-user', userAuth) //login
router.get('/user/refresh-token', refreshToken)
router.post('/user/user-log-out', userLogOut)
router.put('/user/change-user-password', changeUserPassword)
router.get('/user/get-user-details-by-email', getUserDetailsByEmail)
router.get('/user/get-all-users', getAllUsers)
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

//// ITEM ENDPOINTS
router.get('/item/get-all-items', getAllItemsFromDb)
router.get('/item/get-items-by-category', getItemsByCategory)
router.get(
  '/item/get-items-in-category/:itemCategory',
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
router.get('/item/reduced', getReducedItems)
router.post('/item/verify-checkout', verifyCheckout)
router.post('/item/move-cart-to-orders', moveCartToOrders)

// google Authentication Routes
// initialize Google authentication
// when google auth button is clicked, this uri will be fetched
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
)

// once user is authenticated, they will be routed here
router.get('/auth/google/callback', handleGoogleAuthCallback)

export default router
