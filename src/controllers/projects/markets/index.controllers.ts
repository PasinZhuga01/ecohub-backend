import { Markets as Requests } from 'ecohub-shared/schemas/requests';
import { Markets as Responses } from 'ecohub-shared/schemas/responses';

import { safePayload } from '../../utils';
import { Request, ResponseWithSession } from '../../types';

import { getMarketsForPage, createMarket, renameMarket, removeMarket } from '../../../services/projects/markets/index.services';

export async function get(req: Request<Requests.GetRequest>, res: ResponseWithSession<Responses.GetResponse>) {
	await safePayload(res, async () => await getMarketsForPage(res.locals.userId, req.body.projectId));
}

export async function create(req: Request<Requests.CreateRequest>, res: ResponseWithSession<Responses.CreateResponse>) {
	await safePayload(res, async () => await createMarket(res.locals.userId, req.body.projectId, req.body.name));
}

export async function rename(req: Request<Requests.RenameRequest>, res: ResponseWithSession<Responses.RenameResponse>) {
	await safePayload(res, async () => ({ name: await renameMarket(res.locals.userId, req.body.id, req.body.name) }));
}

export async function remove(req: Request<Requests.RemoveRequest>, res: ResponseWithSession<Responses.RemoveResponse>) {
	await safePayload(res, async () => ({ success: await removeMarket(res.locals.userId, req.body.id) }));
}
