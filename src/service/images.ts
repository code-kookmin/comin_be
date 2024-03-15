import { BucketName } from 'aws-sdk/clients/elastictranscoder';
import dotenv from 'dotenv';
import fs from 'fs';
import s3 from '../config/s3Config';
import { ManagedUpload } from 'aws-sdk/clients/s3';
dotenv.config();

export default class ImageService {
  uploadImageS3 = async (fileData: Express.Multer.File) => {
    const fileContent = fs.readFileSync(fileData.path);
    const bucketName = process.env.S3_BUCKET_NAME;
    if (!bucketName) return undefined;
    const params: {
      Bucket: string;
      Key: string;
      Body: Buffer;
    } = {
      Bucket: bucketName,
      Key: fileData.originalname,
      Body: fileContent,
    };
    const result = await s3.upload(params).promise();
    console.log(result);
    console.log(params);
    return result.Location;
  };
}
