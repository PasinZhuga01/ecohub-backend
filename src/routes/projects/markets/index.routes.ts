import { Router } from 'express';
import { Markets as Schemas } from 'ecohub-shared/schemas/requests';
import { createRequestSchemaValidator, verifySessionToken as verifySessionTokenMiddleware } from '@middlewares/index';
import { getMarkets as getMarketsQuerySchema, removeEntity } from '@middlewares/schemas';
import {
	get as getController,
	create as createController,
	rename as renameController,
	remove as removeController
} from '@controllers/projects/markets/index.controllers';

const router = Router();

router.get(
	'/get',
	createRequestSchemaValidator(getMarketsQuerySchema, true),
	createRequestSchemaValidator(Schemas.get),
	verifySessionTokenMiddleware,
	getController
);
router.post('/create', createRequestSchemaValidator(Schemas.create), verifySessionTokenMiddleware, createController);
router.patch('/rename', createRequestSchemaValidator(Schemas.rename), verifySessionTokenMiddleware, renameController);
router.delete(
	'/remove',
	createRequestSchemaValidator(removeEntity, true),
	createRequestSchemaValidator(Schemas.remove),
	verifySessionTokenMiddleware,
	removeController
);

export default router;
