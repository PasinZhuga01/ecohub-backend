import { Router } from 'express';

import { Currencies as Schemas } from '../facade';

import { createRequestBodySchemaValidator, verifySessionToken as verifySessionTokenMiddleware } from '../../middlewares';
import {
	get as getController,
	create as createController,
	rerate as rerateController,
	remove as removeController,
	shift as shiftController
} from '../../controllers/projects/currencies.controllers';
import multer from '../../config/multer';

const router = Router();

router.get('/get', createRequestBodySchemaValidator(Schemas.get), verifySessionTokenMiddleware, getController);
router.post(
	'/create',
	multer.single('icon'),
	createRequestBodySchemaValidator(Schemas.create),
	verifySessionTokenMiddleware,
	createController
);
router.patch('/rerate', createRequestBodySchemaValidator(Schemas.rerate), verifySessionTokenMiddleware, rerateController);
router.delete('/remove', createRequestBodySchemaValidator(Schemas.remove), verifySessionTokenMiddleware, removeController);
router.patch('/shift', createRequestBodySchemaValidator(Schemas.shift), verifySessionTokenMiddleware, shiftController);

export default router;
