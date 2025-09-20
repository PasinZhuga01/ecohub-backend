import { MarketsSchemas as Schemas } from '@models';

import { pickObject, toStringDate } from '../../utils';

export type MarketNavObject = Pick<Schemas.MarketObject, 'id' | 'name'>;
export type MarketPageObject = Pick<Schemas.MarketObject, 'id' | 'name'> & { interactedAt: string };

export function toMarketNavObject(object: Schemas.MarketObject): MarketNavObject {
	return pickObject(object, ['id', 'name']);
}

export function toMarketPageObject(object: Schemas.MarketObject): MarketPageObject {
	return { ...pickObject(object, ['id', 'name']), interactedAt: toStringDate(object.interactedAt) };
}
