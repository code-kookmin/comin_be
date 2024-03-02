import express from 'express';
import { userRankingService } from '../service/userRanking';
import { roundService } from '../service/round';

const route = express.Router();

route.get('/rankings', async (req, res) => {
  const pageSize = req.query.pageSize ? req.query.pageSize : 20;
  const pageNumber = req.query.pageNumber ? req.query.pageNumber : 1;
  const roundId = req.query.roundId ? req.query.roundId : (await roundService.getLastRound())?.id;
  const result = await userRankingService.findOrderedBySolvedCount(
    parseInt(roundId as string),
    parseInt(pageSize as string),
    parseInt(pageNumber as string)
  );
  if (!result) return res.sendStatus(400);
  return res.send(result);
});

export default route;
