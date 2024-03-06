import express from 'express';
import ProblemService from '../service/problem';

const route = express.Router();
const problemService = new ProblemService();

route.get('/recommendation', async (req, res) => {
  const size = req.query.size ? parseInt(req.query.size as string) : 10;
  const result = await problemService.findRecommendation(size);
  if (!result) return res.sendStatus(400);
  return res.send(result);
});

export default route;
