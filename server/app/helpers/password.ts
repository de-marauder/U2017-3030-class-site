import bcrypt from 'bcryptjs';
import { ADMIN_ROLES } from '../models/User';

// Function to hash a password
export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // The higher the value, the slower the hashing process (more secure).
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

// Function to compare a password with a hashed password
export async function comparePassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
    const isPasswordMatch = await bcrypt.compare(inputPassword, hashedPassword);
    return isPasswordMatch;
}

export const isAdmin = (role: string) => ADMIN_ROLES.includes(role)