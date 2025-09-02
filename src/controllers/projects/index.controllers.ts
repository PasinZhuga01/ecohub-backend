import { Projects as Requests } from 'ecohub-shared/schemas/requests';
import { Projects as Responses } from 'ecohub-shared/schemas/responses';

import { safePayload } from '../utils';
import { Request, ResponseWithSession } from '../types';
import { getProjectsForNav, getProjectsForPage, createProject, renameProject, removeProject } from '../../services/projects/index.services';

export async function getNav(req: Request<Requests.GetNavRequest>, res: ResponseWithSession<Responses.GetNavResponse>) {
	await safePayload(res, async () => await getProjectsForNav(res.locals.userId, req.body.maxCount));
}

export async function getPage(_: Request<object>, res: ResponseWithSession<Responses.GetPageResponse>) {
	await safePayload(res, async () => await getProjectsForPage(res.locals.userId));
}

export async function create(req: Request<Requests.CreateRequest>, res: ResponseWithSession<Responses.CreateResponse>) {
	await safePayload(res, async () => await createProject(res.locals.userId, req.body.name));
}

export async function rename(req: Request<Requests.RenameRequest>, res: ResponseWithSession<Responses.RenameResponse>) {
	await safePayload(res, async () => ({ name: await renameProject(res.locals.userId, req.body.id, req.body.name) }));
}

export async function remove(req: Request<Requests.RemoveRequest>, res: ResponseWithSession<Responses.RemoveResponse>) {
	await safePayload(res, async () => ({ success: await removeProject(res.locals.userId, req.body.id) }));
}
