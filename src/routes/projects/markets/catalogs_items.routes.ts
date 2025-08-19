import { Router } from 'express';

import { CatalogsItems as Schemas } from '../../facade';

import { createRequestBodySchemaValidator, verifySessionToken as verifySessionTokenMiddleware } from '../../../middlewares';
import {
	get as getController,
	create as createController,
	edit as editController,
	remove as removeController
} from '../../../controllers/projects/markets/catalogs_items.controllers';

const router = Router();

router.get('/get', createRequestBodySchemaValidator(Schemas.get), verifySessionTokenMiddleware, getController);
router.post('/create', createRequestBodySchemaValidator(Schemas.create), verifySessionTokenMiddleware, createController);
router.patch('/edit', createRequestBodySchemaValidator(Schemas.edit), verifySessionTokenMiddleware, editController);
router.delete('/remove', createRequestBodySchemaValidator(Schemas.remove), verifySessionTokenMiddleware, removeController);

export default router;
