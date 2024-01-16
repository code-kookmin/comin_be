import express from 'express';
import userService from '../service/user';
import { User, isUser } from '../domain/user';

const route = express.Router();

route.get('/login', async (req, res) => {
  if (typeof req.query.email != 'string' || typeof req.query.passWord != 'string') return res.sendStatus(400);

  const user = await userService.findByEmail(req.query.email);
  if (user?.password != req.query.passWord) return res.sendStatus(400);

  if (!req.session.user) {
    req.session.user = user;
  }
  return res.send(user);
});

route.post('/signin', async (req, res) => {
  const user = req.body;
  // 타입가드
  if (!isUser(user)) {
    return res.sendStatus(400);
  }
  const queryResult: User | undefined = await userService.signIn(user);
  if (queryResult) {
    return res.sendStatus(200);
  } else {
    return res.sendStatus(400);
  }
});

// 비밀번호 조회
route.get('/password', async (req, res) => {
  const email = req.query.email as string;
  const result = await userService.findPassword(email);
  if (!result) return res.sendStatus(400);
  return res.send(result);
});

// 프로필 수정
route.put('/profile', async (req, res) => {
  const user = req.body;
  const result = await userService.editProfile(user);
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
});

export default route;
