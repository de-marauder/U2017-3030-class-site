import { Schema, model } from 'mongoose';
import { TypeUser } from '../types/user';
import { string } from 'joi';

const USER_ROLES_ENUM = {
    ADMIN: 'ADMIN',
    REGULAR: 'REGULAR'
}
export const USER_ROLES = Object.values(USER_ROLES_ENUM)
export const ADMIN_ROLES = Object.values(USER_ROLES_ENUM).filter((el) => el.toLowerCase().includes('admin'))

const UserSchema = new Schema<TypeUser & { no: number }>({
    firstName: String,
    otherName: String,
    lastName: String,
    dob: String,
    email: String,
    lga: String,
    img: String,
    state: String,
    phone: String,
    password: { type: String, select: false },
    matNo: {
        type: String,
        required: true
    },
    no: { type: Number },
    role: {
        type: String, default: 'REGULAR', enum: [...Object.values(USER_ROLES_ENUM)]
    },
    isActivated: {
        type: Boolean,
        default: false,
        select: false
    },
    authToken: {
        type: String, select: false
    }
}, { timestamps: true })

export const UserModel = model<TypeUser & { no: number }>('userModel', UserSchema, 'userModel');
