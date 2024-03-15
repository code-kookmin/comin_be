import express from 'express';
import { Request, Response } from 'express';
import ImageService from '../service/images';
import { upload } from '../config/multerConfig';
import multer from 'multer';

const route = express.Router();
const imageService = new ImageService();

route.post('', multer, async (req: Request, res: Response) => {
  console.log(req.files);
  if (!req.file) return res.sendStatus(400);
  const fileData: Express.Multer.File = req.file;
  const result = await imageService.uploadImageS3(fileData);
  if (!result) return res.sendStatus(400);
  return res.send(result);
});

route.post(':imageId/', (req, res) => {});

export default route;
