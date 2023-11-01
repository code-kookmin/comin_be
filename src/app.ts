import express, { Request, Response } from 'express';
import dotenv from 'dotenv'
import helloRoute from '../src/route/hello'
import dbtestRoute from '../src/route/dbtest'

dotenv.config()
var db = require('../config/connection')

const app = express();
app.use('/hello', helloRoute)
app.use('/dbtest', dbtestRoute)
app.get('/', (req: Request, res: Response) => {
  res.sendStatus(418);
});

app.listen('8080', () => {
  console.log(`8080 port is lintening.`);
});