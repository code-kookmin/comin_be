import express from 'express';
import commentService from '../service/comment';
import { Comment } from '../domain/comment';

const route = express.Router();

route.get('/comments/:commentId', (req, res) => {
  const commentId: number = parseInt(req.params.commentId);
  const result = commentService.findById(commentId);
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
  const comment: Comment = req.body;
  const result = await commentService.save(comment);
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
});

route.put('/comments/:commentId', async (req, res) => {
  const commentId: number = parseInt(req.params.commentId);
  const comment: Comment = req.body;
  const result = await commentService.update(commentId, comment);
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
});

route.delete('/comments/:commentId', async (req, res) => {
  const commentId: number = parseInt(req.params.commentId);
  const result = await commentService.deleteById(commentId);
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
});

export default route;
