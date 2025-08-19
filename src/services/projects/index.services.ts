import { toProjectNavObject, toProjectPageObject, ProjectNavObject, ProjectPageObject } from './index.services.schemas';
import { getMarketsForNav } from './markets/index.services';

import { getEntityOrThrow, assertEntityNotExist } from '../utils';

import {
	getProject,
	getProjectsByOrderDesc,
	createProject as createProjectModel,
	renameProject as renameProjectModel,
	removeProject as removeProjectModel
} from '../../models/projects/index.models';
import { ProjectObject } from '../../models/projects/index.models.schemas';
import { PayloadError } from '../../errors';

export async function getProjectOrThrow(id: number): Promise<ProjectObject> {
	return await getEntityOrThrow(await getProject(id), 'project');
}

export async function assertProjectNotExist(userId: number, name: string) {
	await assertEntityNotExist(await getProject(userId, name), { code: 'NAME_TAKEN', details: { resource: 'project' } });
}

export async function assertUserAccessToProject(userId: number, projectId: number) {
	if ((await getProjectOrThrow(projectId)).userId !== userId) {
		throw new PayloadError({ code: 'ACCESS_DENIED' });
	}
}

export async function getProjectsForNav(userId: number, maxCount: number): Promise<ProjectNavObject[]> {
	const projects = (await getProjectsByOrderDesc(userId, maxCount)).map((project) => toProjectNavObject(project));

	for (const project of projects) {
		project.markets = project.markets.concat(await getMarketsForNav(userId, project.id, maxCount));
	}

	return projects;
}

export async function getProjectsForPage(userId: number): Promise<ProjectPageObject[]> {
	return (await getProjectsByOrderDesc(userId)).map((project) => toProjectPageObject(project));
}

export async function createProject(userId: number, name: string): Promise<ProjectPageObject> {
	await assertProjectNotExist(userId, name);

	return toProjectPageObject(await createProjectModel(userId, name));
}

export async function renameProject(userId: number, projectId: number, name: string): Promise<string> {
	await assertUserAccessToProject(userId, projectId);
	await assertProjectNotExist(userId, name);
	await renameProjectModel(projectId, name);

	return name;
}

export async function removeProject(userId: number, projectId: number): Promise<true> {
	await assertUserAccessToProject(userId, projectId);
	await removeProjectModel(projectId);

	return true;
}
