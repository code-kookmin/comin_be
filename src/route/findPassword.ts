import express from 'express';
import findPasswordService from '../service/findPassword';

const route = express.Router();

route.get('/', async (req, res) => {
  const email = req.query.email;
  if (typeof email !== 'string') return res.sendStatus(400);
  const result = (await findPasswordService.findPassword(email)) as string;
  if (result === undefined) return res.sendStatus(400);
  return res.send(result);
});

export default route;
