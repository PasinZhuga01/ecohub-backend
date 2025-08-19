import { toMarketNavObject, toMarketPageObject, MarketNavObject, MarketPageObject } from './index.services.schemas';

import { assertUserAccessToProject } from '../index.services';

import { getEntityOrThrow, assertEntityNotExist } from '../../utils';

import {
	getMarket,
	getMarketsByOrderDesc,
	createMarket as createMarketModel,
	renameMarket as renameMarketModel,
	removeMarket as removeMarketModel
} from '../../../models/projects/markets/index.models';
import { MarketObject } from '../../../models/projects/markets/index.models.schemas';

export async function getMarketOrThrow(id: number): Promise<MarketObject> {
	return await getEntityOrThrow(await getMarket(id), 'market');
}

export async function assertMarketNotExist(projectId: number, name: string) {
	await assertEntityNotExist(await getMarket(projectId, name), { code: 'NAME_TAKEN', details: { resource: 'market' } });
}

export async function assertUserAccessToMarket(userId: number, marketId: number) {
	await assertUserAccessToProject(userId, (await getMarketOrThrow(marketId)).projectId);
}

export async function getMarketsForNav(userId: number, projectId: number, maxCount: number): Promise<MarketNavObject[]> {
	await assertUserAccessToProject(userId, projectId);

	return (await getMarketsByOrderDesc(projectId, maxCount)).map((market) => toMarketNavObject(market));
}

export async function getMarketsForPage(userId: number, projectId: number): Promise<MarketPageObject[]> {
	await assertUserAccessToProject(userId, projectId);

	return (await getMarketsByOrderDesc(projectId)).map((market) => toMarketPageObject(market));
}

export async function createMarket(userId: number, projectId: number, name: string): Promise<MarketPageObject> {
	await assertUserAccessToProject(userId, projectId);
	await assertMarketNotExist(projectId, name);

	return toMarketPageObject(await createMarketModel(projectId, name));
}

export async function renameMarket(userId: number, marketId: number, name: string): Promise<string> {
	await assertUserAccessToMarket(userId, marketId);
	await assertMarketNotExist((await getMarketOrThrow(marketId)).projectId, name);
	await renameMarketModel(marketId, name);

	return name;
}

export async function removeMarket(userId: number, marketId: number): Promise<true> {
	await assertUserAccessToMarket(userId, marketId);
	await removeMarketModel(marketId);

	return true;
}
