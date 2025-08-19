import Router from 'express';

import projectsRouter from './index.routes';
import currenciesRouter from './currencies.routes';
import marketsRouters from './markets';

const router = Router();

router.use('/', projectsRouter);
router.use('/currencies', currenciesRouter);
router.use('/markets', marketsRouters);

export default router;
