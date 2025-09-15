import { currenciesApi } from 'ecohub-shared/schemas/api';
import { createRouter } from '@routes/router';
import { createRequestSchemaValidator, verifySessionToken } from '@middlewares/index';
import {
	get as getController,
	create as createController,
	rerate as rerateController,
	remove as removeController,
	shift as shiftController
} from '@controllers/projects/currencies.controllers';
import multer from '@config/multer';

export default createRouter(currenciesApi, {
	'/get': (body, raw) => [createRequestSchemaValidator(raw, true), createRequestSchemaValidator(body), verifySessionToken, getController],
	'/create': (body, raw) => [
		multer.single('icon'),
		createRequestSchemaValidator(raw, false, true),
		createRequestSchemaValidator(body),
		verifySessionToken,
		createController
	],
	'/rerate': (body) => [createRequestSchemaValidator(body), verifySessionToken, rerateController],
	'/remove': (body, raw) => [
		createRequestSchemaValidator(raw, true),
		createRequestSchemaValidator(body),
		verifySessionToken,
		removeController
	],
	'/shift': (body) => [createRequestSchemaValidator(body), verifySessionToken, shiftController]
});
