import { projectsApi } from 'ecohub-shared/http/api';
import { createRequestSchemaValidator, verifySessionToken } from '@middlewares';
import { Projects as Controllers } from '@controllers';

import { createRouter } from '../utils';

export default createRouter(projectsApi, {
	'/get_nav': (body, raw) => [
		createRequestSchemaValidator(raw, true),
		createRequestSchemaValidator(body),
		verifySessionToken,
		Controllers.getNav
	],
	'/get_page': () => [verifySessionToken, Controllers.getPage],
	'/get': (body, raw) => [
		createRequestSchemaValidator(raw, true),
		createRequestSchemaValidator(body),
		verifySessionToken,
		Controllers.get
	],
	'/create': (body) => [createRequestSchemaValidator(body), verifySessionToken, Controllers.create],
	'/rename': (body) => [createRequestSchemaValidator(body), verifySessionToken, Controllers.rename],
	'/remove': (body, raw) => [
		createRequestSchemaValidator(raw, true),
		createRequestSchemaValidator(body),
		verifySessionToken,
		Controllers.remove
	]
});
