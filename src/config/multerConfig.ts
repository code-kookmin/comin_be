import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

export const upload = multer({
  storage: multerS3({
    s3: new S3Client({
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY as string,
        secretAccessKey: process.env.S3_ACCESS_KEY_SECRET as string,
      },
    }),
    bucket: 'comin-s3',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, callback) {
      callback(null, 'success?');
    },
  }),
});
