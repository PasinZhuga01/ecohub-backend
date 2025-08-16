import express, { Application } from 'express';
import cors from 'cors';

import env from './config/env';

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: env.clientUrl }));

export default app;
