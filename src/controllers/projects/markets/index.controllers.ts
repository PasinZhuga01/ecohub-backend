import { MarketsApi, Request as RequestBody, Response as ResponseBody } from 'ecohub-shared/schemas/api';
import { getMarketsForPage, createMarket, renameMarket, removeMarket, getMarketOrThrow } from '@services/projects/markets/index.services';

import { safePayload } from '../../utils';
import { Request, ResponseWithSession } from '../../types';

export async function getList(
	req: Request<RequestBody<MarketsApi, '/get_list'>>,
	res: ResponseWithSession<ResponseBody<MarketsApi, '/get_list'>>
) {
	await safePayload(res, async () => await getMarketsForPage(res.locals.userId, req.body.projectId));
}

export async function get(req: Request<RequestBody<MarketsApi, '/get'>>, res: ResponseWithSession<ResponseBody<MarketsApi, '/get'>>) {
	await safePayload(res, async () => ({ name: (await getMarketOrThrow(req.body.id)).name }));
}

export async function create(
	req: Request<RequestBody<MarketsApi, '/create'>>,
	res: ResponseWithSession<ResponseBody<MarketsApi, '/create'>>
) {
	await safePayload(res, async () => await createMarket(res.locals.userId, req.body.projectId, req.body.name));
}

export async function rename(
	req: Request<RequestBody<MarketsApi, '/rename'>>,
	res: ResponseWithSession<ResponseBody<MarketsApi, '/rename'>>
) {
	await safePayload(res, async () => ({ name: await renameMarket(res.locals.userId, req.body.id, req.body.name) }));
}

export async function remove(
	req: Request<RequestBody<MarketsApi, '/remove'>>,
	res: ResponseWithSession<ResponseBody<MarketsApi, '/remove'>>
) {
	await safePayload(res, async () => ({ success: await removeMarket(res.locals.userId, req.body.id) }));
}
