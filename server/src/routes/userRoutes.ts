import express, { Router } from 'express'
import { getUserById } from '../controllers/user_controllers/get_user_by_id'
import { createNewUser } from '../controllers/user_controllers/create_user'
import { userAuth } from '../controllers/user_controllers/user_auth'
import { refreshToken } from '../controllers/user_controllers/refresh_token'
import { userLogOut } from '../controllers/user_controllers/user_log_out'
import { updateUserAddress } from '../controllers/user_controllers/update_user_address'
import { getUserByEmail } from '../controllers/user_controllers/get_user_by_email'
import { getAllOrdersFromUser } from '../controllers/payment_controller/get_all_orders_from_user'
import { changeUserPassword } from '../controllers/user_controllers/change_password'

const userRouter: Router = express.Router()

userRouter.get('/get-user-by-id/:userId', getUserById)
userRouter.post('/create-user', createNewUser) // register
userRouter.post('/authenticate-user', userAuth) // login
userRouter.get('/refresh-token', refreshToken)
userRouter.post('/user-log-out', userLogOut)
userRouter.get('/get-user-by-email', getUserByEmail)
userRouter.put('/change-user-password', changeUserPassword)
userRouter.put('/update-user-address', updateUserAddress)

export default userRouter
