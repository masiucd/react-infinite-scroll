import express, { Application, Request, Response, NextFunction } from 'express';
import userRouter from './routes/user';
import './db';

const app: Application = express();
const port = 5000;

app.use('/api/users', userRouter);

app.listen(port, () => console.log(`server is on ${port}`));
