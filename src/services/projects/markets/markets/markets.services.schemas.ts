import { MarketObject } from 'ecohub-shared/db/projects/markets';

import { pickObject, toStringDate } from '../../../utils';

export type MarketNavObject = Pick<MarketObject, 'id' | 'name'>;
export type MarketPageObject = Pick<MarketObject, 'id' | 'name'> & { interactedAt: string };

export function toMarketNavObject(object: MarketObject): MarketNavObject {
	return pickObject(object, ['id', 'name']);
}

export function toMarketPageObject(object: MarketObject): MarketPageObject {
	return { ...pickObject(object, ['id', 'name']), interactedAt: toStringDate(object.interactedAt) };
}
