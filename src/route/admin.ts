import express from "express";
import UserService from "../service/user";
import CommunityService from "../service/community";
import CommentService from "../service/comment";
import ReplyService from "../service/reply";
import { CommuntiyCreate } from "../domain/community/communityCreate";
import { CommentCreate } from "../domain/comment/commentCreate";
import { User } from "../domain/user";

const userService = new UserService();
const communityService = new CommunityService();
const commentService = new CommentService();
const replyService = new ReplyService();

const route = express.Router();

route.post("/user", async (req, res) => {
  const user: User = req.body;
  const result = await userService.save(user);
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
});

route.post("/community", async (req, res) => {
  const community: CommuntiyCreate = req.body;
  const result = await communityService.save(community);
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
});

route.post("/comment", async (req, res) => {
  const comment: CommentCreate = req.body;
  const result = await commentService.save(comment);
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
});

export default route;
