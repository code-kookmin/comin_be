import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.sendStatus(418);
});

app.listen('8080', () => {
  console.log(`8080 port is lintening.`);
});