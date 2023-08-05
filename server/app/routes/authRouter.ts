import { Router } from 'express'
import { createUser, login, logout } from '../controllers/user/create'
import { verifyUserToken } from '../middleware/auth'

export const authRouter = Router()

authRouter.post('/login', login)
authRouter.delete('/logout', verifyUserToken, logout)
authRouter.post('/signup', createUser)
