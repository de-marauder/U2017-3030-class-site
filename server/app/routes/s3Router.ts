import { Router } from "express"
import { getSecureUrl } from "../controllers/s3/getSecureUrl";

export const s3Router = Router()
 s3Router.get('/getSecureUrl', getSecureUrl);