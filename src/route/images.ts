import express from 'express';
import { Request, Response } from 'express';
import multer from 'multer';
import ImageS3Service from '../service/images';
import { memoryStorageMulter } from '../config/multerConfig';

const route = express.Router();
const imageS3Service = new ImageS3Service();

//multer.single("name")은 body에서 name이라는 키를 갖는 파일을 찾아서 변환해줌
route.post('', memoryStorageMulter.single('image'), async (req: Request, res: Response) => {
  const fileData = req.file;
  const key = req.body.key;
  if (!fileData || !key) return res.sendStatus(400);
  const result = await imageS3Service.uploadS3Object(key, fileData);
  if (!result) return res.sendStatus(400);
  return res.send(result);
});

route.post('/:imageKey', async (req, res) => {
  const key = req.params.imageKey;
  const result = await imageS3Service.deleteS3Object(key);
  if (!result) return res.sendStatus(400);
  if (await imageS3Service.checkImageExist(key)) return res.sendStatus(400);
  return res.sendStatus(200);
});

export default route;
