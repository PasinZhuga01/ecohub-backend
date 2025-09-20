import { Projects as Models, ProjectsSchemas as Schemas } from '@models';
import { PayloadError } from '@errors';

import { toProjectNavObject, toProjectPageObject, ProjectNavObject, ProjectPageObject } from './projects.services.schemas';
import { getMarketsForNav } from './markets/markets.services';

import { getEntityOrThrow, assertEntityNotExist } from '../utils';

export async function getProjectOrThrow(id: number): Promise<Schemas.ProjectObject> {
	return await getEntityOrThrow(await Models.getProject(id), 'project');
}

export async function assertProjectNotExist(userId: number, name: string) {
	await assertEntityNotExist(await Models.getProject(userId, name), { code: 'NAME_TAKEN', details: { resource: 'project' } });
}

export async function assertUserAccessToProject(userId: number, projectId: number) {
	if ((await getProjectOrThrow(projectId)).userId !== userId) {
		throw new PayloadError({ code: 'ACCESS_DENIED' });
	}
}

export async function getProjectsForNav(userId: number, maxCount: number): Promise<ProjectNavObject[]> {
	const projects = (await Models.getProjectsByOrderDesc(userId, maxCount)).map((project) => toProjectNavObject(project));

	for (const project of projects) {
		project.markets = project.markets.concat(await getMarketsForNav(userId, project.id, maxCount));
	}

	return projects;
}

export async function getProjectsForPage(userId: number): Promise<ProjectPageObject[]> {
	return (await Models.getProjectsByOrderDesc(userId)).map((project) => toProjectPageObject(project));
}

export async function createProject(userId: number, name: string): Promise<ProjectPageObject> {
	await assertProjectNotExist(userId, name);

	return toProjectPageObject(await Models.createProject(userId, name));
}

export async function renameProject(userId: number, projectId: number, name: string): Promise<string> {
	await assertUserAccessToProject(userId, projectId);
	await assertProjectNotExist(userId, name);

	await Models.renameProject(projectId, name);

	await updateProjectInteractedAt(projectId);

	return name;
}

export async function updateProjectInteractedAt(id: number) {
	await Models.updateProjectInteractedAt(id);
}

export async function removeProject(userId: number, projectId: number): Promise<true> {
	await assertUserAccessToProject(userId, projectId);
	await Models.removeProject(projectId);

	return true;
}
