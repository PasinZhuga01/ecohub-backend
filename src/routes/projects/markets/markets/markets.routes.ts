import { marketsApi } from 'ecohub-shared/http/api/projects/markets';
import { createRequestSchemaValidator, verifySessionToken } from '@middlewares';
import { Markets as Controllers } from '@controllers/projects/markets';

import { createRouter } from '../../../utils';

export default createRouter(marketsApi, {
	'/get_list': (body, raw) => [
		createRequestSchemaValidator(raw, true),
		createRequestSchemaValidator(body),
		verifySessionToken,
		Controllers.getList
	],
	'/get': (body, raw) => [
		createRequestSchemaValidator(raw, true),
		createRequestSchemaValidator(body),
		verifySessionToken,
		Controllers.get
	],
	'/create': (body) => [createRequestSchemaValidator(body), verifySessionToken, Controllers.create],
	'/set_currency': (body) => [createRequestSchemaValidator(body), verifySessionToken],
	'/rename': (body) => [createRequestSchemaValidator(body), verifySessionToken, Controllers.rename],
	'/remove': (body, raw) => [
		createRequestSchemaValidator(raw, true),
		createRequestSchemaValidator(body),
		verifySessionToken,
		Controllers.remove
	]
});
