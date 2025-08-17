import { ProjectObject, projectSchema } from './projects.models.schemas';
import { ModelsUtility } from './utility';

import db from '../config/db';

const utility = new ModelsUtility(projectSchema, 'project');

export async function getProject(id: number): Promise<ProjectObject | null>;
export async function getProject(userId: number, name: string): Promise<ProjectObject | null>;

export async function getProject(id: number, name?: string): Promise<ProjectObject | null> {
	const where = name !== undefined ? 'user_id = ? AND name = ?' : 'id = ?';
	const values = name !== undefined ? [id, name] : [id];

	return await utility.getEntity(`SELECT * FROM projects WHERE ${where}`, values);
}

export async function getProjectsByOrderDesc(userId: number, maxCount?: number): Promise<ProjectObject[]> {
	const limit = maxCount !== undefined ? 'LIMIT ?' : '';
	const values = maxCount !== undefined ? [userId, maxCount] : [userId];

	return utility.getEntities(`SELECT * FROM projects WHERE user_id = ? ORDER BY interacted_at DESC ${limit}`, values);
}

export async function createProject(userId: number, name: string): Promise<ProjectObject> {
	return await utility.createEntity('INSERT INTO projects (user_id, name) VALUES (?, ?)', [userId, name], getProject);
}

export async function renameProject(id: number, name: string) {
	await db.execute('UPDATE projects SET name = ? WHERE id = ?', [name, id]);
}

export async function removeProject(id: number) {
	await db.execute('DELETE FROM projects WHERE id = ?', [id]);
}
