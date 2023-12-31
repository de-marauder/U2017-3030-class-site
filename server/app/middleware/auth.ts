import { decodeToken } from '../helpers/auth'
import { CustomError, ErrorHandler } from '../helpers/errorHandler'
import { type NextFunction, type Request, type Response } from 'express'
import { UserModel } from '../models/User'

export const verifyUserToken = ErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { headers } = req
  // console.log(headers)
  const { authorization } = headers as { authorization: string }
  if (authorization == null) throw new CustomError('authorization headers must be added to request', 401)
  if (!(authorization.startsWith('Bearer'))) throw new CustomError('authorization header should be in format "Bearer <token>"', 401)
  const [, token] = authorization.split(' ')
  if (token == null) throw new CustomError('Bearer token must be passed as authorization header', 401)
  const payload = decodeToken(token) as AuthTokenPayload
  if (payload instanceof Error) throw new CustomError('Error reading token', 401)

  req.body.user = payload
  const user = await UserModel.findById(payload.id).select('authToken')
  if (user == null) throw new CustomError('Token does not belong to a user', 401)
  // console.log(JSON.stringify(user.authToken) !== JSON.stringify(token))
  // console.log(JSON.stringify(token))
  // console.log(JSON.stringify(user.authToken))
  if (user.authToken == null) throw new CustomError('user not logged in', 401)
  if (JSON.stringify(user.authToken) !== JSON.stringify(token)) throw new CustomError('Invalid token', 401)
  next()
})

export interface AuthTokenPayload { id: string, role: string }
