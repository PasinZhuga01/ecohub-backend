import express, { Application } from 'express';
import cors from 'cors';

import router from './routes';
import env from './config/env';

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: env.clientUrl }));

app.use('/', router);

export default app;
