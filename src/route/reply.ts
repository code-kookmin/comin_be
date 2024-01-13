import express from 'express';
import replyService from '../service/reply';
import { ReplyCreate, ReplyUpdate } from '../domain/reply';

const route = express.Router();

route.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await replyService.findById(id);
    if (!result) return res.sendStatus(400);
    return res.send(result);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
});

route.get('/comments/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await replyService.findByCommentId(id);
    if (!result) return res.sendStatus(400);
    return res.send(result);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
});

route.get('/users/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await replyService.findByUserId(id);
    if (!result) return res.sendStatus(400);
    return res.send(result);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
});

route.post('/', async (req, res) => {
  const reply: ReplyCreate = req.body;
  console.log(typeof reply.commentId, reply.commentId);
  try {
    const result = await replyService.save(reply);
    if (!result) return res.sendStatus(400);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
});

route.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const reply: ReplyUpdate = req.body;
  try {
    const result = await replyService.update(id, reply);
    if (!result) return res.sendStatus(400);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
});

route.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await replyService.deleteById(id);
    if (!result) return res.sendStatus(200);
    return res.sendStatus(400);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
});

export default route;
