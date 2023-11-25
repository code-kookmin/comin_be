import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import {User, isUser } from '../domain/user';
import signinService from '../service/signin';
dotenv.config();

const allowedDomainList:string[] = [process.env.ALLOWED_DOMAIN as string];
const corsOption = {
  origin:allowedDomainList
};

const route = express.Router();
route.use(cors(corsOption as object));
route.use(express.json());
route.use(express.urlencoded({extended:true}));

// 회원가입 라우터
route.post("/", async (req, res)=>{

  const user = req.body;
  // 타입가드
  if(!isUser(user)){
    return res.sendStatus(400);
  }
  signinService.signin(user);
});

export default route;