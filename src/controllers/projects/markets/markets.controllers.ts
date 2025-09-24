import { Request as RequestBody, Response as ResponseBody } from 'ecohub-shared/http/api';
import { MarketsApi } from 'ecohub-shared/http/api/projects/markets';
import { Markets as Services } from '@services';

import { safePayload } from '../../utils';
import { Request, ResponseWithSession } from '../../types';

export async function getList(
	req: Request<RequestBody<MarketsApi, '/get_list'>>,
	res: ResponseWithSession<ResponseBody<MarketsApi, '/get_list'>>
) {
	await safePayload(res, async () => await Services.getMarketsForPage(res.locals.userId, req.body.projectId));
}

export async function get(req: Request<RequestBody<MarketsApi, '/get'>>, res: ResponseWithSession<ResponseBody<MarketsApi, '/get'>>) {
	await safePayload(res, async () => ({ name: (await Services.getMarketOrThrow(req.body.id)).name }));
}

export async function create(
	req: Request<RequestBody<MarketsApi, '/create'>>,
	res: ResponseWithSession<ResponseBody<MarketsApi, '/create'>>
) {
	await safePayload(res, async () => await Services.createMarket(res.locals.userId, req.body.projectId, req.body.name));
}

export async function rename(
	req: Request<RequestBody<MarketsApi, '/rename'>>,
	res: ResponseWithSession<ResponseBody<MarketsApi, '/rename'>>
) {
	await safePayload(res, async () => ({ name: await Services.renameMarket(res.locals.userId, req.body.id, req.body.name) }));
}

export async function remove(
	req: Request<RequestBody<MarketsApi, '/remove'>>,
	res: ResponseWithSession<ResponseBody<MarketsApi, '/remove'>>
) {
	await safePayload(res, async () => ({ success: await Services.removeMarket(res.locals.userId, req.body.id) }));
}
