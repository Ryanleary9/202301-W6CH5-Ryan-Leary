import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { bearsRouter } from './router/bears.router.js';
export const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: '*',
};

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

app.use('/bears', bearsRouter);
