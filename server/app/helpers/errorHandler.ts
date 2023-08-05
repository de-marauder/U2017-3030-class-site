import { type NextFunction, type Request, type Response } from 'express'

type Fn = (req: Request, res: Response, next: NextFunction) => Promise<
// Response<any, Record<string, any>> | NextFunction
void
>
export const ErrorHandler = (fn: Fn) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Error | CustomError) => {
      console.log(err)
      if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
          status: 'failed',
          message: err.message ?? 'unknown error occured'
        })
      } else {
        return res.status(500).json({
          status: 'failed',
          message: err.message ?? 'unknown error occured'
        })
      }
    })
  }
}

export class CustomError extends Error {
  statusCode: number

  constructor (message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}
