import { DeleteObjectRequest, PutObjectRequest } from "aws-sdk/clients/s3";
import dotenv from "dotenv";
import { s3 } from "../config/s3Config";
dotenv.config();

export default class ImageS3Service {
  checkImageExist = async (key: string | undefined) => {
    if (!key) return undefined;

    const bucket: DeleteObjectRequest = {
      Bucket: process.env.S3_BUCKET_NAME as string,
      Key: key,
    };

    try {
      const result = await s3.headObject(bucket).promise();
      if (!result.Metadata || result.$response.error) return undefined;
      return result.Metadata.fieldname;
    } catch (err) {
      console.log("image not exist");
      return undefined;
    }
  };

  deleteS3Object = async (key: string | undefined) => {
    if (!key) return undefined;
    try {
      const result = await s3
        .deleteObject({
          Bucket: process.env.S3_BUCKET_NAME as string,
          Key: key,
        })
        .promise();
      if (result.$response.error) return undefined;
      return result;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  uploadS3Object = async (key: string | undefined, fileContent: Express.Multer.File) => {
    if (!key) return undefined;
    try {
      const param: PutObjectRequest = {
        Bucket: process.env.S3_BUCKET_NAME as string,
        Key: key,
        Body: fileContent.buffer, // 파일 데이터에 접근하려면 Express.Multer.File.buffer임
        ACL: "public-read", // 모든 사람에게 읽기 권한 부여
        ContentType: fileContent.mimetype,
      };
      const result = await s3.upload(param).promise();
      if (!result.Location) return undefined;
      return result.Location;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };
}
