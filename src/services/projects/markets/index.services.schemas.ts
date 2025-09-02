import { MarketObject as MarketBaseObject } from '@models/projects/markets/index.models.schemas';

import { pickObject, toStringDate } from '../../utils';

export type MarketNavObject = Pick<MarketBaseObject, 'id' | 'name'>;
export type MarketPageObject = Pick<MarketBaseObject, 'id' | 'name'> & { interactedAt: string };

export function toMarketNavObject(object: MarketBaseObject): MarketNavObject {
	return pickObject(object, ['id', 'name']);
}

export function toMarketPageObject(object: MarketBaseObject): MarketPageObject {
	return { ...pickObject(object, ['id', 'name']), interactedAt: toStringDate(object.interactedAt) };
}
