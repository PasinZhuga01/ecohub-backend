import { marketsApi } from 'ecohub-shared/schemas/api';
import { createRequestSchemaValidator, verifySessionToken } from '@middlewares/index';
import {
	getList as getListController,
	get as getController,
	create as createController,
	rename as renameController,
	remove as removeController
} from '@controllers/projects/markets/index.controllers';
import { createRouter } from '@routes/router';

export default createRouter(marketsApi, {
	'/get_list': (body, raw) => [
		createRequestSchemaValidator(raw, true),
		createRequestSchemaValidator(body),
		verifySessionToken,
		getListController
	],
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
