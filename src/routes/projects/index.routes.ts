import { projectsApi } from 'ecohub-shared/schemas/api';
import { createRouter } from '@routes/router';
import { createRequestSchemaValidator, verifySessionToken } from '@middlewares/index';
import {
	getNav as getNavController,
	getPage as getPageController,
	get as getController,
	create as createController,
	rename as renameController,
	remove as removeController
} from '@controllers/projects/index.controllers';

export default createRouter(projectsApi, {
	'/get_nav': (body, raw) => [
		createRequestSchemaValidator(raw, true),
		createRequestSchemaValidator(body),
		verifySessionToken,
		getNavController
	],
	'/get_page': () => [verifySessionToken, getPageController],
	'/get': (body, raw) => [createRequestSchemaValidator(raw, true), createRequestSchemaValidator(body), verifySessionToken, getController],
	'/create': (body) => [createRequestSchemaValidator(body), verifySessionToken, createController],
	'/rename': (body) => [createRequestSchemaValidator(body), verifySessionToken, renameController],
	'/remove': (body, raw) => [
		createRequestSchemaValidator(raw, true),
		createRequestSchemaValidator(body),
		verifySessionToken,
		removeController
	]
});
