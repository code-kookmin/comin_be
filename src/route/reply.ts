import express from 'express';
import replyService from '../service/reply';
import { Reply, isReplyCreate, isReplyUpdate } from '../domain/reply';
import { isUser } from '../domain/user/user';

const route = express.Router();

route.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await replyService.findById(id);
  if (!result) return res.sendStatus(400);
  return res.send(result);
});

route.get('/comments/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await replyService.findByCommentId(id);
  if (!result) return res.sendStatus(400);
  return res.send(result);
});

route.get('/users/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await replyService.findByUserId(id);
  if (!result) return res.sendStatus(400);
  return res.send(result);
});

route.post('/', async (req, res) => {
  const reply: Reply = req.body;
  const user = req.session.user;
  if (!isReplyCreate(reply) || !user || !isUser(user)) return res.sendStatus(400);
  reply.userId = user.id;
  const result = await replyService.save(reply);
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
});

route.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const reply: Reply = req.body;
  const user = req.session.user;
  if (!isReplyUpdate(reply) || isNaN(id) || !user || !isUser(user)) return res.sendStatus(400);
  const result = await replyService.update(user.id, id, reply);
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
});

route.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const user = req.session.user;
  if (isNaN(id) || !user || !isUser(user)) return res.sendStatus(200);
  const result = await replyService.deleteById(user.id, id);
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
});

export default route;
