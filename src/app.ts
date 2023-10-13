import express from 'express';
// import cors from 'cors';

import router from './routes';
import { authorized } from './middleware/auth';
import { ErrorHandler } from './middleware/error';

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey');
  res.setHeader(
    'Access-Control-Expose-Headers',
    'Content-Type, Authorization, apikey'
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authorized);
app.use('/api', router);

app.use(ErrorHandler.pageNotFound);

export default app;
