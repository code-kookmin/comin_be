import express from 'express';
import { Comment } from '../domain/comment/comment';
import { CommentCreate } from '../domain/comment/commentCreate';
import { CommentUpdate, isCommentUpdate } from '../domain/comment/commentUpdate';
import { isUser } from '../domain/user/user';
import CommentService from '../service/comment';
import { authChecker } from '../util/authChecker';

const route = express.Router();
const commentService = new CommentService();

route.get('/comments/:commentId', async (req, res) => {
  const commentId: number = parseInt(req.params.commentId);
  const result = await commentService.findById(commentId);
  if (!result) return res.sendStatus(400);
  return res.send(result);
});

route.get('/:communityId/comments', async (req, res) => {
  const communityId: number = parseInt(req.params.communityId);
  const result = await commentService.findByCommunityId(communityId);
  if (!result) return res.sendStatus(400);
  return res.send(result);
});

route.post('/comments', async (req, res) => {
  const comment: CommentCreate = req.body;
  const user = req.session.user;
  if (!user || !isUser(user)) return res.sendStatus(400);
  const result = await commentService.save(user.id, comment);
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
});

route.put('/comments/:commentId', async (req, res) => {
  const commentId: number = parseInt(req.params.commentId);
  const comment: CommentUpdate = req.body;
  if(!(await authChecker.checkUpdateAndDeleteAuth(req, commentId, commentService))) return res.sendStatus(400);
  const result = await commentService.update(commentId, comment);
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
});

route.delete('/comments/:commentId', async (req, res) => {
  const commentId: number = parseInt(req.params.commentId);
  if(!(await authChecker.checkUpdateAndDeleteAuth(req, commentId, commentService))) return res.sendStatus(400);
  const result = await commentService.deleteById(commentId);
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
});

export default route;
