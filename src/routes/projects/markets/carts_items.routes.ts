import { Router } from 'express';

import { CartsItems as Schemas } from '../../facade';

import { createRequestBodySchemaValidator, verifySessionToken as verifySessionTokenMiddleware } from '../../../middlewares';
import {
	get as getController,
	add as addController,
	recount as recountController,
	remove as removeController,
	clear as clearController
} from '../../../controllers/projects/markets/carts_items.controllers';

const router = Router();

router.get('/get', createRequestBodySchemaValidator(Schemas.get), verifySessionTokenMiddleware, getController);
router.post('/add', createRequestBodySchemaValidator(Schemas.add), verifySessionTokenMiddleware, addController);
router.patch('/recount', createRequestBodySchemaValidator(Schemas.recount), verifySessionTokenMiddleware, recountController);
router.delete('/remove', createRequestBodySchemaValidator(Schemas.remove), verifySessionTokenMiddleware, removeController);
router.delete('/clear', createRequestBodySchemaValidator(Schemas.clear), verifySessionTokenMiddleware, clearController);

export default router;
