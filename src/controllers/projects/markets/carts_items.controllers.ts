import { safePayload } from '../../utils';
import { Request, ResponseWithSession } from '../../types';
import { CartsItems as Requests } from '../../facade/requests';
import { CartsItems as Responses } from '../../facade/responses';

import { getItems, addItem, recountItem, removeItem, clearItems } from '../../../services/projects/markets/carts_items.services';

export async function get(req: Request<Requests.GetRequest>, res: ResponseWithSession<Responses.GetResponse>) {
	await safePayload(res, async () => await getItems(res.locals.userId, req.body.marketId));
}

export async function add(req: Request<Requests.AddRequest>, res: ResponseWithSession<Responses.AddResponse>) {
	await safePayload(res, async () => await addItem(res.locals.userId, req.body.marketId, req.body.catalogItemId));
}

export async function recount(req: Request<Requests.RecountRequest>, res: ResponseWithSession<Responses.RecountResponse>) {
	await safePayload(res, async () => ({ count: await recountItem(res.locals.userId, req.body.id, req.body.count) }));
}

export async function remove(req: Request<Requests.RemoveRequest>, res: ResponseWithSession<Responses.RemoveResponse>) {
	await safePayload(res, async () => ({ success: await removeItem(res.locals.userId, req.body.id) }));
}

export async function clear(req: Request<Requests.ClearRequest>, res: ResponseWithSession<Responses.ClearResponse>) {
	await safePayload(res, async () => ({ success: await clearItems(res.locals.userId, req.body.marketId) }));
}
