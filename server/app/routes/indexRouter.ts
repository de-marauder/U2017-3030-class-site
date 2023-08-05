import { Router } from 'express'
import { userRouter } from './userRouter'
import { s3Router } from './s3Router'
import { verifyUserToken } from '../middleware/auth'
import { authRouter } from './authRouter'

export const baseRouter = Router()

baseRouter.use('/auth', authRouter)
baseRouter.use('/users', userRouter)
baseRouter.use(verifyUserToken)
baseRouter.use('/s3', s3Router)
