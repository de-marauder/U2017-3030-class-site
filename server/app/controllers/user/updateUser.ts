import { Request, Response } from 'express'
import { UserModel } from '../../models/User'
import { updateUserValidator } from './validator';
import { CustomError, ErrorHandler } from '../../helpers/errorHandler';
import { AuthTokenPayload } from '../../middleware/auth';
import { isAdmin } from '../../helpers/password';

export const updateUser = ErrorHandler(async (req: Request, res: Response) => {
    const { id, role } = (req.body as { user: AuthTokenPayload }).user
    delete req.body.user
    const {userId} = req.params as {userId: string}
    const data = await updateUserValidator.validateAsync(req.body);
    // const userExist = await UserModel.findById(isAdmin(role) ? userId : id).catch((err: Error) => {
    //     console.log('Problem getting a user')
    //     console.log(err)
    // })
    // if (userExist) return res.status(400).json({ status: 'failed', message: 'User with this email already exists' })
    const user = await UserModel.findOneAndUpdate({ _id: id}, data, { runValidators: true, returnOriginal: false });
    if (!user) throw new CustomError('This mat. no does not exist. Contact admin', 404)

    res.status(200).json({ status: 'success', data: { user } })
})
