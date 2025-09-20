import { cartsItemsApi } from 'ecohub-shared/http/api';
import { createRequestSchemaValidator, verifySessionToken } from '@middlewares';
import { CartsItems as Controllers } from '@controllers';

import { createRouter } from '../../../utils';

export default createRouter(cartsItemsApi, {
	'/get': (body, raw) => [
		createRequestSchemaValidator(raw, true),
		createRequestSchemaValidator(body),
		verifySessionToken,
		Controllers.get
	],
	'/add': (body) => [createRequestSchemaValidator(body), verifySessionToken, Controllers.add],
	'/recount': (body) => [createRequestSchemaValidator(body), verifySessionToken, Controllers.recount],
	'/remove': (body, raw) => [
		createRequestSchemaValidator(raw, true),
		createRequestSchemaValidator(body),
		verifySessionToken,
		Controllers.remove
	],
	'/clear': (body, raw) => [
		createRequestSchemaValidator(raw, true),
		createRequestSchemaValidator(body),
		verifySessionToken,
		Controllers.clear
	]
});
