import jwt, { type JwtPayload } from 'jsonwebtoken'
import { env } from './env'

// Function to generate a JWT
export function generateToken (payload: Record<string, any>, expiresIn?: string): string {
  const token = jwt.sign(payload, env('SECRET_KEY'), { expiresIn })
  return token
}

// Function to decode a JWT
export const decodeToken = (token: string): string | JwtPayload | Error => {
  try {
    const decodedToken = jwt.verify(token, env('SECRET_KEY'))
    return decodedToken
  } catch (error) {
    // Token verification failed
    console.error('Error decoding JWT:', error)
    return (error as Error)
  }
}
