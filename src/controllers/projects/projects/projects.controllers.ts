import { Request as RequestBody, Response as ResponseBody } from 'ecohub-shared/http/api';
import { ProjectsApi } from 'ecohub-shared/http/api/projects';
import { Projects as Services } from '@services/projects';

import { safePayload } from '../../utils';
import { Request, ResponseWithSession } from '../../types';

export async function getNav(
	req: Request<RequestBody<ProjectsApi, '/get_nav'>>,
	res: ResponseWithSession<ResponseBody<ProjectsApi, '/get_nav'>>
) {
	await safePayload(res, async () => await Services.getProjectsForNav(res.locals.userId, req.body.maxCount));
}

export async function getPage(
	_: Request<RequestBody<ProjectsApi, '/get_page'>>,
	res: ResponseWithSession<ResponseBody<ProjectsApi, '/get_page'>>
) {
	await safePayload(res, async () => await Services.getProjectsForPage(res.locals.userId));
}

export async function get(req: Request<RequestBody<ProjectsApi, '/get'>>, res: ResponseWithSession<ResponseBody<ProjectsApi, '/get'>>) {
	await safePayload(res, async () => ({ name: (await Services.getProjectOrThrow(req.body.id)).name }));
}

export async function create(
	req: Request<RequestBody<ProjectsApi, '/create'>>,
	res: ResponseWithSession<ResponseBody<ProjectsApi, '/create'>>
) {
	await safePayload(res, async () => await Services.createProject(res.locals.userId, req.body.name));
}

export async function rename(
	req: Request<RequestBody<ProjectsApi, '/rename'>>,
	res: ResponseWithSession<ResponseBody<ProjectsApi, '/rename'>>
) {
	await safePayload(res, async () => ({ name: await Services.renameProject(res.locals.userId, req.body.id, req.body.name) }));
}

export async function remove(
	req: Request<RequestBody<ProjectsApi, '/remove'>>,
	res: ResponseWithSession<ResponseBody<ProjectsApi, '/remove'>>
) {
	await safePayload(res, async () => ({ success: await Services.removeProject(res.locals.userId, req.body.id) }));
}
