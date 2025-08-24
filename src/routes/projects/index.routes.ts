import { Router } from 'express';

import { Projects as Schemas } from '../facade';

import { createRequestSchemaValidator, verifySessionToken as verifySessionTokenMiddleware } from '../../middlewares';
import { getNavProjects as getNavProjectsQuerySchema, removeEntity } from '../../middlewares/schemas';
import {
	getNav as getNavController,
	getPage as getPageController,
	create as createController,
	rename as renameController,
	remove as removeController
} from '../../controllers/projects/index.controllers';

const router = Router();

router.get(
	'/get_nav',
	createRequestSchemaValidator(getNavProjectsQuerySchema, true),
	createRequestSchemaValidator(Schemas.getNav),
	verifySessionTokenMiddleware,
	getNavController
);
router.get('/get_page', verifySessionTokenMiddleware, getPageController);
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
