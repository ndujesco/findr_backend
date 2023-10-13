import express from 'express';
import cors from 'cors';

import router from './routes';
import { authorized } from './middleware/auth';
import { ErrorHandler } from './middleware/error';

const app = express();

app.use('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authorized);
app.use('/api', router);

app.use(ErrorHandler.pageNotFound);

export default app;
