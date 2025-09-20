import { CatalogsItemsApi, Request as RequestBody, Response as ResponseBody } from 'ecohub-shared/http/api';
import { CatalogsItems as Services } from '@services';

import { safePayload } from '../../../utils';
import { Request, ResponseWithSession } from '../../../types';

export async function get(
	req: Request<RequestBody<CatalogsItemsApi, '/get'>>,
	res: ResponseWithSession<ResponseBody<CatalogsItemsApi, '/get'>>
) {
	await safePayload(res, async () => await Services.getItems(res.locals.userId, req.body.marketId));
}

export async function create(
	req: Request<RequestBody<CatalogsItemsApi, '/create'>>,
	res: ResponseWithSession<ResponseBody<CatalogsItemsApi, '/create'>>
) {
	await safePayload(
		res,
		async () => await Services.createItem(res.locals.userId, req.body.marketId, req.body.name, req.body.count, req.body.price)
	);
}

export async function edit(
	req: Request<RequestBody<CatalogsItemsApi, '/edit'>>,
	res: ResponseWithSession<ResponseBody<CatalogsItemsApi, '/edit'>>
) {
	await safePayload(res, async () => ({
		value: await Services.editItem(res.locals.userId, req.body.id, req.body.component, req.body.value)
	}));
}

export async function remove(
	req: Request<RequestBody<CatalogsItemsApi, '/remove'>>,
	res: ResponseWithSession<ResponseBody<CatalogsItemsApi, '/remove'>>
) {
	await safePayload(res, async () => ({ success: await Services.removeItem(res.locals.userId, req.body.id) }));
}
