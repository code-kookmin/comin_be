import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import helloRoute from '../src/route/hello';
import WeeklyProblemRoute from './route/weeklyProblem';
import UserRoute from './route/user';
import communityRoute from './route/community';
import commentRoute from './route/comment';
import ReplyRoute from './route/reply';
import UserRankingRoute from './route/userRanking';
import ProblemRoute from './route/problem';
import AdminRoute from './route/admin';
import CategoryRoute from './route/category';
import ImageRoute from './route/images';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { TspecDocsMiddleware } from 'tspec';
import schedule from 'node-schedule';
import { User } from './domain/user';
import { updateRatingAndRanking } from './util/updateRankingAndRating';
import { updateAndInitRound } from './util/updateAndInitRound';
// import { socketIO } from './socket/socketIO.mjs';

declare module 'express-session' {
  export interface SessionData {
    user: User;
    admin: Boolean;
  }
}

dotenv.config();
schedule.scheduleJob('0 0 0 * * *', async () => {
  await updateRatingAndRanking();
});
schedule.scheduleJob('0 0 9 * * 1', async () => {
  await updateAndInitRound();
});

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: process.env.ALLOWED_DOMAIN }));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    secret: process.env.COOKIE_SECRET || 'undefined',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
    },
    name: 'session-cookie',
  })
);

app.use('/docs', await TspecDocsMiddleware());

app.use('/weekly-problem', WeeklyProblemRoute);
app.use('/admin', AdminRoute);
app.use('/user', UserRoute, UserRankingRoute);
app.use('/community', communityRoute, commentRoute);
app.use('/category', CategoryRoute);
app.use('/image', ImageRoute);
app.use('/reply', ReplyRoute);
app.get('/', (req: Request, res: Response) => {
  res.sendStatus(418);
});
app.use('/problem', ProblemRoute);
app.listen('8080', () => {
  console.log(`8080 port is lintening.`);
});
