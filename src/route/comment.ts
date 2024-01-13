import express from 'express';
import { CommentCreate, CommentUpdate } from '../domain/comment';
import commentService from '../service/comment';

const route = express.Router();

route.get('/:id', async (req, res) => {
  const id: number = parseInt(req.params.id);
  try {
    const result = await commentService.findById(id);
    if (!result) return res.sendStatus(400);
    return res.send(result);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
});

route.get('/community/:id', async (req, res) => {
  const communityId: number = parseInt(req.params.id);
  try {
    const result = await commentService.findByCommunityId(communityId);
    if (!result) return res.sendStatus(400);
    return res.send(result);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
});

route.post('/', async (req, res) => {
  const comment: CommentCreate = req.body;
  try {
    const result = await commentService.save(comment);
    if (!result) return res.sendStatus(400);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
});

route.put('/:id', async (req, res) => {
  const id: number = parseInt(req.params.id);
  const comment: CommentUpdate = req.body;
  try {
    const result = await commentService.update(id, comment);
    if (!result) return res.sendStatus(400);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
});

route.delete('/:id', async (req, res) => {
  const id: number = parseInt(req.params.id);
  try {
    const result = await commentService.deleteById(id);
    if (!result) return res.sendStatus(400);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
});

export default route;
