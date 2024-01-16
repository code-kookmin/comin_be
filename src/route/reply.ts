import express from 'express';
import replyService from '../service/reply';
import { Reply } from '../domain/reply';

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
  const result = await replyService.save(reply);
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
});

route.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const reply: Reply = req.body;
  const result = await replyService.update(id, reply);
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
});

route.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await replyService.deleteById(id);
  if (!result) return res.sendStatus(200);
  return res.sendStatus(400);
});

export default route;
