import { catalogsItemsApi } from 'ecohub-shared/http/api';
import { createRequestSchemaValidator, verifySessionToken } from '@middlewares';
import { CatalogsItems as Controllers } from '@controllers';

import { createRouter } from '../../../utils';

export default createRouter(catalogsItemsApi, {
	'/get': (body, raw) => [
		createRequestSchemaValidator(raw, true),
		createRequestSchemaValidator(body),
		verifySessionToken,
		Controllers.get
	],
	'/create': (body) => [createRequestSchemaValidator(body), verifySessionToken, Controllers.create],
	'/edit': (body) => [createRequestSchemaValidator(body), verifySessionToken, Controllers.edit],
	'/remove': (body, raw) => [
		createRequestSchemaValidator(raw, true),
		createRequestSchemaValidator(body),
		verifySessionToken,
		Controllers.remove
	]
});
