import express from "express";
import weeklyProblemService from "../service/weeklyProblem";
const route = express.Router();
route.get("/", async (req, res) => {
    const result = await weeklyProblemService.findByLikeDate();
    if (!result) {
        res.sendStatus(403);
        return;
    }
    res.send(result);
});
route.post("/", async (req, res) => {
    if (typeof req.body.problem_id !== "number") {
        res.sendStatus(403);
    }
    const result = await weeklyProblemService.save(req.body.problem_id);
    if (!result) {
        res.sendStatus(403);
        return;
    }
    res.sendStatus(201);
});
export default route;
