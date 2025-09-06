import { projectSchema, ProjectObject } from './index.models.schemas';

import { ModelsUtility } from '../utility';

const utility = new ModelsUtility<typeof projectSchema, 'user_id' | 'name'>(projectSchema, 'projects', 'project');

export async function getProject(id: number): Promise<ProjectObject | null>;
export async function getProject(userId: number, name: string): Promise<ProjectObject | null>;

export async function getProject(id: number, name?: string): Promise<ProjectObject | null> {
	return await utility.getEntity(name !== undefined ? { user_id: id, name } : { id });
}

export async function getProjectsByOrderDesc(userId: number, maxCount?: number): Promise<ProjectObject[]> {
	return await utility.getEntities({ user_id: userId }, { orderKey: 'interacted_at', count: maxCount ?? Infinity });
}

export async function createProject(userId: number, name: string): Promise<ProjectObject> {
	return await utility.createEntity({ user_id: userId, name });
}

export async function renameProject(id: number, name: string) {
	await utility.updateEntities({ id }, { name });
}

export async function updateProjectInteractedAt(id: number) {
	return await utility.updateEntities({ id }, { interacted_at: new Date() });
}

export async function removeProject(id: number) {
	await utility.removeEntities({ id });
}
