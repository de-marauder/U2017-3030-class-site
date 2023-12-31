import type { Request, Response } from 'express'
import { generateUploadUrl } from '../../helpers/s3'
import { ErrorHandler } from '../../helpers/errorHandler'

export const getSecureUrl = ErrorHandler(async (req: Request, res: Response) => {
  console.log('Route hit')
  const { objectName, key } = req.query as { objectName: string, key: string }
  console.log('objectName: ', objectName)
  const url = await generateUploadUrl(objectName, key)
  res.status(200).json({ url })
})
