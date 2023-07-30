import Joi from 'joi';
import { TypeUser } from '../../types/user';

const stringPattern = /^U201[5-8]\/30300[0-6][0-9]$/
export const createUserValidator = Joi.object<TypeUser>({
    email: Joi.string().email().required(),
    phone: Joi.string().length(11),
    password: Joi.string().alphanum().min(8).required(),
    matNo: Joi.string().regex(stringPattern).required(),
});

export const loginUserValidator = Joi.object<Pick<TypeUser, 'email' | 'password' | 'matNo'>>({
    email: Joi.string().email(),
    password: Joi.string().alphanum().min(8).required(),
    matNo: Joi.string().regex(stringPattern).required()
});

export const updateUserValidator = Joi.object<TypeUser>({
    firstName: Joi.string(),
    lastName: Joi.string(),
    otherName: Joi.string(),
    email: Joi.string().email(),
    dob: Joi.date(),
    state: Joi.string(),
    lga: Joi.string(),
    phone: Joi.string().length(11),
    img: Joi.string()
});