import { Request, Response } from 'express'
import { UserModel } from '../../models/User'
import { comparePassword, hashPassword } from '../../helpers/password';
import { createUserValidator, loginUserValidator } from './validator';
import { CustomError, ErrorHandler } from '../../helpers/errorHandler';
import { generateToken } from '../../helpers/auth';
import { TypeUser } from '../../types/user';

export const createUser = ErrorHandler(async (req: Request, res: Response) => {
    const data = await createUserValidator.validateAsync(req.body);
    const userExist = await UserModel.findOne({ email: data.email }).catch((err: Error) => {
        console.log('Problem getting a user')
        console.log(err)
    })
    if (userExist) return res.status(400).json({ status: 'failed', message: 'User with this email already exists' })
    const userExist2 = await UserModel.findOne({ matNo: data.matNo }).catch((err: Error) => {
        console.log('Problem getting a user')
        console.log(err)
    })
    if (userExist2) return res.status(400).json({ status: 'failed', message: 'User with this mat number already exists' })
    // const user = await UserModel.findOneAndUpdate({ matNo: data.matNo }, data, { runValidators: true, returnOriginal: false });
    // if (!user) throw new CustomError('This mat. no does not exist. Contact admin', 404)
    const user = new UserModel(data)
    if (!user) throw new CustomError('This mat. no does not exist. Contact admin', 404)
    // const password = user.password;
    const hashedPassword = await hashPassword(user.password);
    console.log('pasword: ', user.password)
    console.log('hash: ', hashedPassword)
    user.password = hashedPassword;
    const token = generateToken({ id: user._id, role: user.role }, '100000000h');
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
    console.log('req', req)
    console.log('body', req.body)
    const data = await loginUserValidator.validateAsync(req.body);

    const userExist = await UserModel.findOne({ matNo: data.matNo, email: data.email }).select('authToken isActivated password').catch((err: Error) => {
        console.log('Problem getting a user')
        console.log(err)
        throw new CustomError('Error getting user', 500)
    })
    if (!userExist) throw new CustomError('Mat no. and E-mail does not match', 404)
    if (!userExist.isActivated) throw new CustomError('User with this mat no. has not been activated. Please sign up', 400)

    const isMatch = await comparePassword(data.password, userExist.password);
    const token = generateToken({ id: userExist._id, role: userExist.role }, '100000000000000000000h');
    console.log('Password Match:', isMatch); // Output: Password Match: true

    if (!isMatch) throw new CustomError('Password incorrect', 400)
    userExist.authToken = token
    console.log('authToken: ', userExist.authToken)
    const us = await userExist.save({ validateBeforeSave: true });
    console.log('us: ', us)
    const u = userExist as PartialUser
    delete u.authToken
    delete u.isActivated
    delete u.password
    res.status(200).json({ status: 'success', data: { user: u }, token })
})


type PartialUser = Partial<TypeUser>