import express from 'express';
import userService from '../service/user';
import { User, isUser } from '../domain/user/user';
import communityService from '../service/community';
import commentService from '../service/comment';
import { UserCreate, isUserCreate } from '../domain/user/userCreate';

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
  if (!isUserCreate(user)) {
    return res.sendStatus(400);
  }
  const queryResult: UserCreate | undefined = await userService.signIn(user);
  if (queryResult) {
    return res.sendStatus(200);
  } else {
    return res.sendStatus(400);
  }
});

route.get('/logout', async (req, res) => {
  if (req.session && req.session.user) {
    req.session.destroy(() => {
      console.log(`destroy user ( id : ${req.session.user?.id}`);
    });
    return res.sendStatus(200);
  }
  return res.sendStatus(400);
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
  if (!isUserCreate(user) || !req.session || !req.session.user) return res.sendStatus(400);
  const result = await userService.editProfile(req.session.user.id, user);
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
});

// 특정 사용자의 게시글(community) 조회
route.get('/:user_id/communities', async (req, res) => {
  const user_id = parseInt(req.params.user_id);
  if (!user_id) return res.sendStatus(400);
  const result = await communityService.findByUserId(user_id);
  return res.send(result);
});

// 특정 사용자의 댓글(comments) 조회
route.get('/:user_id/comments', async (req, res) => {
  const user_id = parseInt(req.params.user_id);
  if (!user_id) return res.sendStatus(400);
  const result = await commentService.findByUserId(user_id);
  return res.send(result);
});

export default route;
