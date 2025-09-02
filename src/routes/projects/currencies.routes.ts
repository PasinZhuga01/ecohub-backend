import { Router } from 'express';
import { Currencies as Schemas } from 'ecohub-shared/schemas/requests';
import { createRequestSchemaValidator, verifySessionToken as verifySessionTokenMiddleware } from '@middlewares/index';
import { getCurrencies as getCurrenciesQuerySchema, removeEntity, createCurrency } from '@middlewares/schemas';
import {
	get as getController,
	create as createController,
	rerate as rerateController,
	remove as removeController,
	shift as shiftController
} from '@controllers/projects/currencies.controllers';
import multer from '@config/multer';

const router = Router();

router.get(
	'/get',
	createRequestSchemaValidator(getCurrenciesQuerySchema, true),
	createRequestSchemaValidator(Schemas.get),
	verifySessionTokenMiddleware,
	getController
);
router.post(
	'/create',
	multer.single('icon'),
	createRequestSchemaValidator(createCurrency, false, true),
	createRequestSchemaValidator(Schemas.create),
	verifySessionTokenMiddleware,
	createController
);
router.patch('/rerate', createRequestSchemaValidator(Schemas.rerate), verifySessionTokenMiddleware, rerateController);
router.delete(
	'/remove',
	createRequestSchemaValidator(removeEntity, true),
	createRequestSchemaValidator(Schemas.remove),
	verifySessionTokenMiddleware,
	removeController
);
router.patch('/shift', createRequestSchemaValidator(Schemas.shift), verifySessionTokenMiddleware, shiftController);

export default router;
