import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import { Request } from "express";

export const memoryStorageMulter = multer({
  storage: multer.memoryStorage(),
});
