import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from '@routes/index';
import env from '@config/env';

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: env.clientUrl }));
app.use(morgan('dev'));

app.use('/', router);
app.use('/images', express.static(env.uploadsPath));

export default app;
