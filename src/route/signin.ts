import express from 'express';
import { User, isUser } from '../domain/user';
import signinService from '../service/signIn';

const route = express.Router();

// 회원가입 라우터
route.post('/', async (req, res) => {
  const user = req.body;
  // 타입가드
  if (!isUser(user)) {
    return res.sendStatus(400);
  }
  const queryResult: User | undefined = await signinService.signIn(user);
  if (queryResult) {
    return res.sendStatus(200);
  } else {
    return res.sendStatus(400);
  }
});

export default route;
