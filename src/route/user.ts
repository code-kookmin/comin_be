import express from "express";
import { User, isUser } from "../domain/user";
import UserService from "../service/user";
import CommunityService from "../service/community";
import CommentService from "../service/comment";
import { authChecker } from "../util/authChecker";
import { Role, numberToRole, roleToNumber } from "../domain/role";

const route = express.Router();
const userService = new UserService();
const communityService = new CommunityService();
const commentService = new CommentService();

route.get("/login", async (req, res) => {
  if (typeof req.query.email != "string" || typeof req.query.passWord != "string") return res.sendStatus(400);

  const user = await userService.findByEmail(req.query.email);
  if (user?.password != req.query.passWord) return res.sendStatus(400);

  if (!req.session.user) {
    req.session.user = user;
  }
  return res.send(user);
});

route.post("/signin", async (req, res) => {
  const user = req.body;
  if (!authChecker.checkSaveUserAuth(req)) return res.sendStatus(400);
  const queryResult: User | undefined = await userService.save(user);
  if (queryResult) {
    return res.sendStatus(200);
  } else {
    return res.sendStatus(400);
  }
});

route.get("/logout", async (req, res) => {
  if (req.session && req.session.user) {
    req.session.destroy((err) => {
      console.log(err);
    });
    return res.sendStatus(200);
  }
  return res.sendStatus(400);
});

// 비밀번호 조회
route.get("/password", async (req, res) => {
  const email = req.query.email as string;
  const result = await userService.findPassword(email);
  if (!result) return res.sendStatus(400);
  return res.send(result);
});

// 프로필 수정
route.put("/profile", async (req, res) => {
  const user = req.body;
  if (!(await authChecker.checkUpdateAndDeleteAuth(req, user.id, userService))) return res.sendStatus(400);
  const result = await userService.update(user);
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
});

// 사용자 권한 수정
route.put("/role", async (req, res) => {
  if (!req.session.user || !isUser(req.session.user)) return res.sendStatus(400);
  if (req.session.user.role !== roleToNumber(Role.ROLE_ADMIN)) return res.sendStatus(400);
  const role = numberToRole(parseInt(req.body.role));
  const result = await userService.updateRole(role);
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
});

// 특정 사용자의 게시글(community) 조회
route.get("/:user_id/communities", async (req, res) => {
  const user_id = parseInt(req.params.user_id);
  const result = await communityService.findByUserId(user_id);
  return res.send(result);
});

// 특정 사용자의 댓글(comments) 조회
route.get("/:user_id/comments", async (req, res) => {
  const user_id = parseInt(req.params.user_id);
  const result = await commentService.findByUserId(user_id);
  return res.send(result);
});

export default route;
