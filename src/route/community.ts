import express from 'express';
import communityService from '../service/community';
import { User, isUser } from '../domain/user';

const route = express.Router();

route.get('/:id', async (req, res) => {
  if (isNaN(parseInt(req.params.id))) return res.sendStatus(400);
  try {
    const result = await communityService.findById(parseInt(req.params.id));
    if (!result) return res.sendStatus(400);
    return res.send(result);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
});

route.post('/', async (req, res) => {
  const { title, category, content } = req.body;
  const user: User | undefined = req.session.user;
  if (
    typeof title !== 'string' ||
    typeof category !== 'string' ||
    typeof content !== 'string' ||
    !user ||
    !isUser(user)
  )
    return res.sendStatus(400);
  try {
    const result = await communityService.save(
      title,
      category,
      content,
      user.id
    );
    console.log('community create route : ', result);
    if (result === undefined) return res.sendStatus(400);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
});

route.delete('/:id', async (req, res) => {
  if (isNaN(parseInt(req.params.id))) return res.sendStatus(400);
  const id = parseInt(req.params.id);
  try {
    const result = await communityService.deleteById(id);
    if (result === undefined) return res.sendStatus(400);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
});

route.put('/:id', async (req, res) => {
  const { title, content } = req.body;
  const id = parseInt(req.params.id);
  if (isNaN(id) || typeof title !== 'string' || typeof content !== 'string')
    return res.sendStatus(400);
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
