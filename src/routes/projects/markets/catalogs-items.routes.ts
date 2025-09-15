import { catalogsItemsApi } from 'ecohub-shared/schemas/api';
import { createRequestSchemaValidator, verifySessionToken } from '@middlewares/index';
import {
	get as getController,
	create as createController,
	edit as editController,
	remove as removeController
} from '@controllers/projects/markets/catalogs-items.controllers';
import { createRouter } from '@routes/router';

export default createRouter(catalogsItemsApi, {
	'/get': (body, raw) => [createRequestSchemaValidator(raw, true), createRequestSchemaValidator(body), verifySessionToken, getController],
	'/create': (body) => [createRequestSchemaValidator(body), verifySessionToken, createController],
	'/edit': (body) => [createRequestSchemaValidator(body), verifySessionToken, editController],
	'/remove': (body, raw) => [
		createRequestSchemaValidator(raw, true),
		createRequestSchemaValidator(body),
		verifySessionToken,
		removeController
	]
});
