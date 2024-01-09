import express from 'express';
import userService from '../service/user';

const route = express.Router();

route.get("/login", async (req, res) => {
  if(typeof req.query.email != "string" || typeof req.query.passWord != "string") return res.sendStatus(400);

  const user = await userService.findByEmail(req.query.email);
  if(user?.password != req.query.passWord) return res.sendStatus(400);

  if(!req.session.user){
      req.session.user = user;
  }
  return res.send(user);
})

// 비밀번호 조회
route.get('/password', async (req, res) => {
  const email = req.query.email as string;
  try {
    const result = await userService.findPassword(email);
    if (!result) return res.sendStatus(400);
    return res.send(result);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
});

// 프로필 수정
route.put('/profile', async (req, res) => {
  const user = req.body;
  try {
    const result = await userService.editProfile(user);
    if (!result) return res.sendStatus(400);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
});

export default route;
