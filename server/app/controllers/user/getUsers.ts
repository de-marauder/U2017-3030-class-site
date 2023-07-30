import { Request, Response } from "express";
import { CustomError, ErrorHandler } from "../../helpers/errorHandler";
import { AuthTokenPayload } from "../../middleware/auth";
import { UserModel } from "../../models/User";
import { isAdmin } from "../../helpers/password";

export const getOneUser = ErrorHandler(async (req: Request, res: Response) => {
    const { user:u } = req.body as {user: AuthTokenPayload}
    const { userId } = req.params as { userId: string }

    const user = await UserModel.findById(isAdmin(u.role) ? userId : u.id)
        .catch((err: Error) => {
            console.log(err);
            throw new CustomError('Error while getting user', 500);
        })
    if (!user) throw new CustomError('User does not exist', 404);
    res.status(200).json({
        status: 'success',
        data: { user }
    })
})

export const getAllUsers = ErrorHandler(async (req: Request, res: Response) => {
    const users = await UserModel.find()
        .catch((err: Error) => {
            console.log(err);
            throw new CustomError('Error while getting user', 500);
        })
    res.status(200).json({
        status: 'success',
        data: { users }
    })
})

