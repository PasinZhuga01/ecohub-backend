import { MarketObject } from 'ecohub-shared/db/projects/markets';

import { MarketNavObject, MarketPageObject } from './markets.services.types';

import { pickObject, toStringDate } from '../../../utils';

export function toMarketNavObject(object: MarketObject): MarketNavObject {
	return pickObject(object, ['id', 'name']);
}

export function toMarketPageObject(object: MarketObject): MarketPageObject {
	return { ...pickObject(object, ['id', 'name']), interactedAt: toStringDate(object.interactedAt) };
}
