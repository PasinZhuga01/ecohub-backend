import { MarketObject, marketSchema } from './markets.models.schemas';
import { ModelsUtility } from './utility';

import db from '../config/db';

const utility = new ModelsUtility(marketSchema, 'market');

export async function getMarket(id: number): Promise<MarketObject | null>;
export async function getMarket(projectId: number, name: string): Promise<MarketObject | null>;

export async function getMarket(id: number, name?: string): Promise<MarketObject | null> {
	const where = name !== undefined ? 'project_id = ? AND name = ?' : 'id = ?';
	const values = name !== undefined ? [id, name] : [id];

	return await utility.getEntity(`SELECT * FROM markets WHERE ${where}`, values);
}

export async function getMarketsByOrderDesc(projectId: number, maxCount?: number): Promise<MarketObject[]> {
	const limit = maxCount !== undefined ? 'LIMIT ?' : '';
	const values = maxCount !== undefined ? [projectId, maxCount] : [projectId];

	return await utility.getEntities(`SELECT * FROM markets WHERE project_id = ? ORDER BY interacted_at DESC ${limit}`, values);
}

export async function createMarket(projectId: number, name: string): Promise<MarketObject> {
	return await utility.createEntity('INSERT INTO markets (project_id, name) VALUES (?, ?)', [projectId, name], getMarket);
}

export async function renameMarket(id: number, name: string) {
	await db.execute('UPDATE markets SET name = ? WHERE id = ?', [name, id]);
}

export async function removeMarket(id: number) {
	await db.execute('DELETE FROM market WHERE id = ?', [id]);
}
