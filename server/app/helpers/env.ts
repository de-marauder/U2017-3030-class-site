import dotenv from 'dotenv'

dotenv.config()
export const env = (envVar: string): string => {
  return process.env[envVar] ?? ''
}
