import { Router } from 'express';

import { Projects as Schemas } from '../facade';

import { createRequestBodySchemaValidator, verifySessionToken as verifySessionTokenMiddleware } from '../../middlewares';
import {
	getNav as getNavController,
	getPage as getPageController,
	create as createController,
	rename as renameController,
	remove as removeController
} from '../../controllers/projects/index.controllers';

const router = Router();

router.get('/get_nav', createRequestBodySchemaValidator(Schemas.getNav), verifySessionTokenMiddleware, getNavController);
router.get('/get_page', verifySessionTokenMiddleware, getPageController);
router.post('/create', createRequestBodySchemaValidator(Schemas.create), verifySessionTokenMiddleware, createController);
router.patch('/rename', createRequestBodySchemaValidator(Schemas.rename), verifySessionTokenMiddleware, renameController);
router.delete('/remove', createRequestBodySchemaValidator(Schemas.remove), verifySessionTokenMiddleware, removeController);

export default router;
