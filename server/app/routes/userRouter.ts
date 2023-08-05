import { Router } from 'express'
import { getAllUsers, getOneUser } from '../controllers/user/getUsers'
import { updateUser } from '../controllers/user/updateUser'
import { verifyUserToken } from '../middleware/auth'

export const userRouter = Router()

userRouter.get('/', getAllUsers)
userRouter.get('/:userId', verifyUserToken, getOneUser)
userRouter.patch('/:userId', verifyUserToken, updateUser)
