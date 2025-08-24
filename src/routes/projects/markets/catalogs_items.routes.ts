import { Router } from 'express';

import { CatalogsItems as Schemas } from '../../facade';

import { createRequestSchemaValidator, verifySessionToken as verifySessionTokenMiddleware } from '../../../middlewares';
import { getCatalogsItems as getCatalogsItemsQuerySchema, removeEntity } from '../../../middlewares/schemas';
import {
	get as getController,
	create as createController,
	edit as editController,
	remove as removeController
} from '../../../controllers/projects/markets/catalogs_items.controllers';

const router = Router();

router.get(
	'/get',
	createRequestSchemaValidator(getCatalogsItemsQuerySchema, true),
	createRequestSchemaValidator(Schemas.get),
	verifySessionTokenMiddleware,
	getController
);
router.post('/create', createRequestSchemaValidator(Schemas.create), verifySessionTokenMiddleware, createController);
router.patch('/edit', createRequestSchemaValidator(Schemas.edit), verifySessionTokenMiddleware, editController);
router.delete(
	'/remove',
	createRequestSchemaValidator(removeEntity, true),
	createRequestSchemaValidator(Schemas.remove),
	verifySessionTokenMiddleware,
	removeController
);

export default router;
