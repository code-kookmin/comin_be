import express, { Request, Response } from 'express';
import dotenv from 'dotenv'
import helloRoute from '../src/route/hello'
import WeeklyProblemRoute from "./route/weeklyProblem";

dotenv.config()


const app = express();

app.use(express.json());

app.use("/weekly-problem", WeeklyProblemRoute);

app.get('/', (req: Request, res: Response) => {
  res.sendStatus(418);
});

app.listen('8080', () => {
  console.log(process.env.user);
  console.log(`8080 port is lintening.`);
});