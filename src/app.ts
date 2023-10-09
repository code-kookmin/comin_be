import express, { Request, Response } from 'express';

const app = express();


app.get('/home', (req: Request, res: Response) => {
  res.send('welcome!');
});

app.listen('8080', () => {
  console.log(`8080 port is lintening.`);
});