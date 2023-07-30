import { Router } from "express";
import { createUser, login } from "../controllers/user/create";

export const authRouter = Router()

authRouter.post('/login', login);
authRouter.post('/signup', createUser);