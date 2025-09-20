import { currenciesApi } from 'ecohub-shared/http/api';
import { createRequestSchemaValidator, verifySessionToken } from '@middlewares';
import { Currencies as Controllers } from '@controllers';
import multer from '@config/multer';

import { createRouter } from '../../utils';

export default createRouter(currenciesApi, {
	'/get': (body, raw) => [
		createRequestSchemaValidator(raw, true),
		createRequestSchemaValidator(body),
		verifySessionToken,
		Controllers.get
	],
	'/create': (body, raw) => [
		multer.single('icon'),
		createRequestSchemaValidator(raw, false, true),
		createRequestSchemaValidator(body),
		verifySessionToken,
		Controllers.create
	],
	'/rerate': (body) => [createRequestSchemaValidator(body), verifySessionToken, Controllers.rerate],
	'/remove': (body, raw) => [
		createRequestSchemaValidator(raw, true),
		createRequestSchemaValidator(body),
		verifySessionToken,
		Controllers.remove
	],
	'/shift': (body) => [createRequestSchemaValidator(body), verifySessionToken, Controllers.shift]
});
