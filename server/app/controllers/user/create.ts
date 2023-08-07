import type { Request, Response } from 'express'
import { UserModel } from '../../models/User'
import { comparePassword, hashPassword } from '../../helpers/password'
import { createUserValidator, loginUserValidator } from './validator'
import { CustomError, ErrorHandler } from '../../helpers/errorHandler'
import { generateToken } from '../../helpers/auth'
import type { TypeUser } from '../../types/user'
import type { AuthTokenPayload } from '../../middleware/auth'

export const createUser = ErrorHandler(async (req: Request, res: Response) => {
  const data = await createUserValidator.validateAsync(req.body)
  const userExist = await UserModel.findOne({ email: data.email }).catch((err: Error) => {
    console.log('Problem getting a user')
    console.log(err)
  })
  if (userExist != null) {
    res.status(400).json({ status: 'failed', message: 'User with this email already exists' })
    return
  }
  const userExist2 = await UserModel.findOne({ matNo: data.matNo }).catch((err: Error) => {
    console.log('Problem getting a user')
    console.log(err)
  })
  if (userExist2 != null) {
    res.status(400).json({ status: 'failed', message: 'User with this mat number already exists' })
    return
  }
  // const user = await UserModel.findOneAndUpdate({ matNo: data.matNo }, data, { runValidators: true, returnOriginal: false })
  // if (!user) throw new CustomError('This mat. no does not exist. Contact admin', 404)
  const user = new UserModel(data)
  // if (!user) throw new CustomError('This mat. no does not exist. Contact admin', 404)
  // const password = user.password
  const hashedPassword = await hashPassword(user.password)
  console.log('pasword: ', user.password)
  console.log('hash: ', hashedPassword)
  user.password = hashedPassword
  const token = generateToken({ id: user._id, role: user.role }, '100000000h')
  user.authToken = token
  user.isActivated = true
  user.no = +(user.matNo.slice(-3))
  await user.save()
  const u = user as PartialUser
  delete u.authToken
  delete u.isActivated
  delete u.password
  console.log(u)
  res.status(201).json({ status: 'success', data: { user: u }, token })
})

export const login = ErrorHandler(async (req: Request, res: Response) => {
  const data = await loginUserValidator.validateAsync(req.body)

  const userExist = await UserModel.findOne({ matNo: data.matNo, email: data.email }).select('authToken isActivated password').catch((err: Error) => {
    // console.log('Problem getting a user')
    console.log(err)
    throw new CustomError('Error getting user', 500)
  })
  if (userExist == null) throw new CustomError('Mat no. and E-mail do not match', 404)
  if (userExist.isActivated == null) throw new CustomError('User with this mat no. has not been activated. Please sign up', 400)

  const isMatch = await comparePassword(data.password, userExist.password)
  const token = (userExist.authToken !== '') ? userExist.authToken : generateToken({ id: userExist._id, role: userExist.role }, '100000000000000000000h')

  if (!isMatch) throw new CustomError('Password incorrect', 400)
  if (userExist.authToken === '') userExist.authToken = token
  await userExist.save({ validateBeforeSave: true })
  const u = userExist as PartialUser
  delete u.authToken
  delete u.isActivated
  delete u.password
  res.status(200).json({ status: 'success', data: { user: u }, token })
})

export const logout = ErrorHandler(async (req: Request, res: Response) => {
  const { user: u } = (req.body as { user: AuthTokenPayload })
  const user = await UserModel.findOneAndUpdate(
    { _id: u.id, isActivated: true },
    { authToken: '' }
  ).catch((err: Error) => {
    console.log(err)
    throw new CustomError('Error logging out user', 500)
  })
  if (user == null) throw new CustomError('User not found', 404)
  res.status(200).json({ status: 'success', data: {} })
})

type PartialUser = Partial<TypeUser>
