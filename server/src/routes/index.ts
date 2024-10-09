import { Router } from 'express'
import userRouter from './userRoutes'
import itemRouter from './itemRoutes'

const router = Router()

router.use('/user', userRouter)
router.use('/item', itemRouter)

export default router
