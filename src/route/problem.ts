import express from "express";
import BojService from "../service/boj";

const route = express.Router();
const bojService = new BojService();

route.get("/recommendation", async (req, res) => {
  const size = req.query.size ? parseInt(req.query.size as string) : 10;
  const result = await bojService.findRecommendedProblem(size);
  if (!result) return res.sendStatus(400);
  return res.send(result);
});

route.get("/:problemId", async (req, res) => {
  const problemId: number = parseInt(req.params.problemId);
  const result = await bojService.getProblemInfo(problemId);
  if (!result) return res.sendStatus(400);
  return res.send(result);
});

export default route;
