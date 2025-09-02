import { CatalogsItems as Requests } from 'ecohub-shared/schemas/requests';
import { CatalogsItems as Responses } from 'ecohub-shared/schemas/responses';

import { safePayload } from '../../utils';
import { Request, ResponseWithSession } from '../../types';

import { getItems, createItem, editItem, removeItem } from '../../../services/projects/markets/catalogs_items.services';

export async function get(req: Request<Requests.GetRequest>, res: ResponseWithSession<Responses.GetResponse>) {
	await safePayload(res, async () => await getItems(res.locals.userId, req.body.marketId));
}

export async function create(req: Request<Requests.CreateRequest>, res: ResponseWithSession<Responses.CreateResponse>) {
	await safePayload(
		res,
		async () => await createItem(res.locals.userId, req.body.marketId, req.body.name, req.body.count, req.body.price)
	);
}

export async function edit(req: Request<Requests.EditRequest>, res: ResponseWithSession<Responses.EditResponse>) {
	await safePayload(res, async () => ({ value: await editItem(res.locals.userId, req.body.id, req.body.component, req.body.value) }));
}

export async function remove(req: Request<Requests.RemoveRequest>, res: ResponseWithSession<Responses.RemoveResponse>) {
	await safePayload(res, async () => ({ success: await removeItem(res.locals.userId, req.body.id) }));
}
