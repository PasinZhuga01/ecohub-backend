import Router from 'express';

import marketsRouter from './index.routes';
import catalogsItemsRouter from './catalogs_items.routes';
import cartsItemsRouter from './carts_items.routes';

const router = Router();

router.use('/', marketsRouter);
router.use('/catalogs_items', catalogsItemsRouter);
router.use('/carts_items', cartsItemsRouter);

export default router;
