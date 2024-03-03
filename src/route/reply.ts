import express from 'express';
import { Reply, isReplyCreate, isReplyUpdate } from '../domain/reply';
import { isUser } from '../domain/user/user';
import ReplyService from '../service/reply';
import { authChecker } from '../util/authChecker';

const route = express.Router();
const replyService = new ReplyService;

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
  if (!user || !isUser(user)) return res.sendStatus(400);
  reply.userId = user.id;
  const result = await replyService.save(reply);
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
});

route.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const reply: Reply = req.body;
  if (!(await authChecker.checkUpdateAndDeleteAuth(req, id, replyService))) return res.sendStatus(400);
  const result = await replyService.update(id, reply);
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
});

route.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (!(await authChecker.checkUpdateAndDeleteAuth(req, id, replyService))) return res.sendStatus(400);
  const result = await replyService.deleteById(id);
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
});

export default route;
