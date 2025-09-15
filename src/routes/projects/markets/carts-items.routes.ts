import { cartsItemsApi } from 'ecohub-shared/schemas/api';
import { createRequestSchemaValidator, verifySessionToken } from '@middlewares/index';
import {
	get as getController,
	add as addController,
	recount as recountController,
	remove as removeController,
	clear as clearController
} from '@controllers/projects/markets/carts-items.controllers';
import { createRouter } from '@routes/router';

export default createRouter(cartsItemsApi, {
	'/get': (body, raw) => [createRequestSchemaValidator(raw, true), createRequestSchemaValidator(body), verifySessionToken, getController],
	'/add': (body) => [createRequestSchemaValidator(body), verifySessionToken, addController],
	'/recount': (body) => [createRequestSchemaValidator(body), verifySessionToken, recountController],
	'/remove': (body, raw) => [
		createRequestSchemaValidator(raw, true),
		createRequestSchemaValidator(body),
		verifySessionToken,
		removeController
	],
	'/clear': (body, raw) => [
		createRequestSchemaValidator(raw, true),
		createRequestSchemaValidator(body),
		verifySessionToken,
		clearController
	]
});
