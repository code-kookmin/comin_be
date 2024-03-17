import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import dotenv from "dotenv";
import { Request } from "express";

dotenv.config();
const { S3_REGION, S3_ACCESS_KEY, S3_ACCESS_KEY_SECRET } = process.env;

export const s3 = new aws.S3({
  secretAccessKey: S3_ACCESS_KEY_SECRET,
  accessKeyId: S3_ACCESS_KEY,
  region: S3_REGION,
});
