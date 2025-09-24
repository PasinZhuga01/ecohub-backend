import { Request as RequestBody, Response as ResponseBody } from 'ecohub-shared/http/api';
import { CartsItemsApi } from 'ecohub-shared/http/api/projects/markets';
import { CartsItems as Services } from '@services/projects/markets';

import { safePayload } from '../../../utils';
import { Request, ResponseWithSession } from '../../../types';

export async function get(req: Request<RequestBody<CartsItemsApi, '/get'>>, res: ResponseWithSession<ResponseBody<CartsItemsApi, '/get'>>) {
	await safePayload(res, async () => await Services.getItems(res.locals.userId, req.body.marketId));
}

export async function add(req: Request<RequestBody<CartsItemsApi, '/add'>>, res: ResponseWithSession<ResponseBody<CartsItemsApi, '/add'>>) {
	await safePayload(res, async () => await Services.addItem(res.locals.userId, req.body.marketId, req.body.catalogItemId));
}

export async function recount(
	req: Request<RequestBody<CartsItemsApi, '/recount'>>,
	res: ResponseWithSession<ResponseBody<CartsItemsApi, '/recount'>>
) {
	await safePayload(res, async () => ({ count: await Services.recountItem(res.locals.userId, req.body.id, req.body.count) }));
}

export async function remove(
	req: Request<RequestBody<CartsItemsApi, '/remove'>>,
	res: ResponseWithSession<ResponseBody<CartsItemsApi, '/remove'>>
) {
	await safePayload(res, async () => ({ success: await Services.removeItem(res.locals.userId, req.body.id) }));
}

export async function clear(
	req: Request<RequestBody<CartsItemsApi, '/clear'>>,
	res: ResponseWithSession<ResponseBody<CartsItemsApi, '/clear'>>
) {
	await safePayload(res, async () => ({ success: await Services.clearItems(res.locals.userId, req.body.marketId) }));
}
