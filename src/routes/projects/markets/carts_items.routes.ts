import { Router } from 'express';

import { CartsItems as Schemas } from '../../facade';

import { createRequestSchemaValidator, verifySessionToken as verifySessionTokenMiddleware } from '../../../middlewares';
import { clearCartsItems, getCartsItems as getCartsItemsQuerySchema, removeEntity } from '../../../middlewares/schemas';
import {
	get as getController,
	add as addController,
	recount as recountController,
	remove as removeController,
	clear as clearController
} from '../../../controllers/projects/markets/carts_items.controllers';

const router = Router();

router.get(
	'/get',
	createRequestSchemaValidator(getCartsItemsQuerySchema, true),
	createRequestSchemaValidator(Schemas.get),
	verifySessionTokenMiddleware,
	getController
);
router.post('/add', createRequestSchemaValidator(Schemas.add), verifySessionTokenMiddleware, addController);
router.patch('/recount', createRequestSchemaValidator(Schemas.recount), verifySessionTokenMiddleware, recountController);
router.delete(
	'/remove',
	createRequestSchemaValidator(removeEntity, true),
	createRequestSchemaValidator(Schemas.remove),
	verifySessionTokenMiddleware,
	removeController
);
router.delete(
	'/clear',
	createRequestSchemaValidator(clearCartsItems, true),
	createRequestSchemaValidator(Schemas.clear),
	verifySessionTokenMiddleware,
	clearController
);

export default router;
