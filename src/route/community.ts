import express from 'express';
import communityService from '../service/community';

const route = express.Router();

route.get('/findById', async (req, res) => {
  const id = parseInt(req.query.id as string);
  if (typeof id !== 'number') return res.sendStatus(400);
  try {
    const result = await communityService.findById(id);
    if (result === undefined) return res.sendStatus(400);
    return res.send(result);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
});

route.post('/save', async (req, res) => {
  const { title, category, content } = req.body;
  if (
    typeof title !== 'string' ||
    typeof category !== 'string' ||
    typeof content !== 'string'
  )
    return res.sendStatus(400);
  try {
    const result = await communityService.save(title, category, content);
    if (result === undefined) return res.sendStatus(400);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
});

route.delete('/delete', async (req, res) => {
  const id = req.body.id;
  if (typeof id !== 'number') return res.sendStatus(400);
  try {
    const result = await communityService.deleteById(id);
    if (result === undefined) return res.sendStatus(400);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
});

route.post('/update', async (req, res) => {
  const { id, title, content } = req.body;
  if (
    typeof id !== 'number' ||
    typeof title !== 'string' ||
    typeof content !== 'string'
  )
    return res.sendStatus(400);
  console.log(id, title, content);
  try {
    const result = await communityService.update(id, title, content);
    if (result === undefined) return res.sendStatus(400);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
});

export default route;
