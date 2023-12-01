import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import logRouter from './features/log/log.routes.js';

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Headers', 'Content-Type, *');
  res.header('Access-Control-Allow-Methods', '*');
  if (req.method == 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded());
app.use('/api/logs', logRouter);

export default app;