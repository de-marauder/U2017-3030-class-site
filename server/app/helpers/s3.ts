import aws from 'aws-sdk';
import { env } from './env';

const region = env('REGION')
const bucketName = env('BUCKET_NAME')
const accessKeyId = env('ACCESS_KEY_ID')
const secretAccessKey = env('SECRET_ACCESS_KEY')

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

export const generateUploadUrl = async (objectName: string, key:string) => {
    const params = {
        Bucket: bucketName,
        Key: key + '/' + Buffer.from(objectName).toString('base64'),
        Expires: 60
    }
    console.log(params)
    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
    return uploadUrl
}