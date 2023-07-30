import { Router } from "express";
import { createUser } from "../controllers/user/create";
import { getAllUsers, getOneUser } from "../controllers/user/getUsers";
import { updateUser } from "../controllers/user/updateUser";

export const userRouter = Router()

userRouter.get('/', getAllUsers);
userRouter.get('/:userId', getOneUser);
userRouter.patch('/:userId', updateUser);