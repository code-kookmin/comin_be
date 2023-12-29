import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import helloRoute from '../src/route/hello';
import signInRoute from '../src/route/signin';
import WeeklyProblemRoute from './route/weeklyProblem';
import findPasswordRoute from './route/findPassword';
import editProfileRoute from './route/editProfile';
import communityRoute from './route/community';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: process.env.ALLOWED_DOMAIN }));
app.use(express.urlencoded({ extended: true }));
app.use('/weekly-problem', WeeklyProblemRoute);

app.use('/signin', signInRoute);
app.use('/findPassword', findPasswordRoute);
app.use('/editProfile', editProfileRoute);
app.use('/community', communityRoute);
app.get('/', (req: Request, res: Response) => {
  res.sendStatus(418);
});

app.listen('8080', () => {
  console.log(process.env.DB_HOST);
  console.log(`8080 port is lintening.`);
});
