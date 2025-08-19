import { Router } from 'express';

import { Markets as Schemas } from '../../facade';

import { createRequestSchemaValidator, verifySessionToken as verifySessionTokenMiddleware } from '../../../middlewares';
import {
	get as getController,
	create as createController,
	rename as renameController,
	remove as removeController
} from '../../../controllers/projects/markets/index.controllers';

const router = Router();

router.get('/get', createRequestSchemaValidator(Schemas.get), verifySessionTokenMiddleware, getController);
router.post('/create', createRequestSchemaValidator(Schemas.create), verifySessionTokenMiddleware, createController);
router.patch('/rename', createRequestSchemaValidator(Schemas.rename), verifySessionTokenMiddleware, renameController);
router.delete('/remove', createRequestSchemaValidator(Schemas.remove), verifySessionTokenMiddleware, removeController);

export default router;
