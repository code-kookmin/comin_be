import express, {Request, Response} from 'express';
import dotenv from 'dotenv'
import helloRoute from '../src/route/hello'
import signInRoute from '../src/route/signin'
import WeeklyProblemRoute from "./route/weeklyProblem";
import morgan from 'morgan';


dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));


app.use("/weekly-problem", WeeklyProblemRoute);


app.use('/signin', signInRoute);
app.get('/', (req: Request, res: Response) => {
  res.sendStatus(418);
});

app.listen('8080', () => {
  console.log(process.env.DB_HOST);
  console.log(`8080 port is lintening.`);
});