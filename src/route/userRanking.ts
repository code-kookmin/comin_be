import express from 'express';
import { userRankingService } from '../service/userRanking';
import { roundService } from '../service/round';

const route = express.Router();

route.get('/rankings/solved', async (req, res) => {
  const pageSize = req.query.pageSize ? req.query.pageSize : 20;
  const pageNumber = req.query.pageNumber ? req.query.pageNumber : 1;
  const roundId = req.query.roundId ? req.query.roundId : (await roundService.getCurrentRound())?.id;
  const result = await userRankingService.findOrderedBySolvedCount(
    parseInt(roundId as string),
    parseInt(pageSize as string),
    parseInt(pageNumber as string)
  );
  if (!result) return res.sendStatus(400);
  return res.send(result);
});

route.get('/rankings/weight', async (req, res) => {
  const pageSize = req.query.pageSize ? req.query.pageSize : 20;
  const pageNumber = req.query.pageNumber ? req.query.pageNumber : 1;
  const roundId = req.query.roundId ? req.query.roundId : (await roundService.getCurrentRound())?.id;
  const result = await userRankingService.findOrderedBySolvedCountWeight(
    parseInt(roundId as string),
    parseInt(pageSize as string),
    parseInt(pageNumber as string)
  );
  if (!result) return res.sendStatus(400);
  return res.send(result);
});

route.get('/:userId/rankings', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const roundId = req.query.roundId ? req.query.roundId : (await roundService.getCurrentRound())?.id;
  const result = await userRankingService.findByUserAndRound(userId, parseInt(roundId as string));
  if (!result) return res.sendStatus(400);
  return res.send(result);
});

export default route;
