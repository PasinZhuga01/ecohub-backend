import { Router } from 'express';

import { Markets as Schemas } from '../../facade';

import { createRequestBodySchemaValidator, verifySessionToken as verifySessionTokenMiddleware } from '../../../middlewares';
import {
	get as getController,
	create as createController,
	rename as renameController,
	remove as removeController
} from '../../../controllers/projects/markets/index.controllers';

const router = Router();

router.get('/get', createRequestBodySchemaValidator(Schemas.get), verifySessionTokenMiddleware, getController);
router.post('/create', createRequestBodySchemaValidator(Schemas.create), verifySessionTokenMiddleware, createController);
router.patch('/rename', createRequestBodySchemaValidator(Schemas.rename), verifySessionTokenMiddleware, renameController);
router.delete('/remove', createRequestBodySchemaValidator(Schemas.remove), verifySessionTokenMiddleware, removeController);

export default router;
