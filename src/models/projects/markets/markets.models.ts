import { marketSchema, MarketObject } from './markets.models.schemas';

import { ModelsUtility } from '../../utility';

const utility = new ModelsUtility<typeof marketSchema, 'project_id' | 'name'>(marketSchema, 'markets', 'market');

export async function getMarket(id: number): Promise<MarketObject | null>;
export async function getMarket(projectId: number, name: string): Promise<MarketObject | null>;

export async function getMarket(id: number, name?: string): Promise<MarketObject | null> {
	return await utility.getEntity(name !== undefined ? { project_id: id, name } : { id });
}

export async function getMarketsByOrderDesc(projectId: number, maxCount?: number): Promise<MarketObject[]> {
	return await utility.getEntities({ project_id: projectId }, { orderKey: 'interacted_at', count: maxCount ?? Infinity });
}

export async function createMarket(projectId: number, name: string): Promise<MarketObject> {
	return await utility.createEntity({ project_id: projectId, name });
}

export async function renameMarket(id: number, name: string) {
	await utility.updateEntities({ id }, { name });
}

export async function updateMarketInteractedAt(id: number) {
	return await utility.updateEntities({ id }, { interacted_at: new Date() });
}

export async function removeMarket(id: number) {
	await utility.removeEntities({ id });
}
