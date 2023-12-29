import express from 'express';
import communityService from '../service/community';

const route = express.Router();

route.get('/findById', (req, res) => {});

route.post('/save', async (req, res) => {
  const { title, category, content } = req.body;
  try {
    const result = await communityService.save(title, category, content);
    if (result === undefined) return res.sendStatus(400);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
});

export default route;
