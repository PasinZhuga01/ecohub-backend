import { CatalogItemObject as CatalogItemBaseObject } from 'ecohub-shared/db/projects/markets';
import { CatalogsItems as Models } from '@models/projects/markets';
import { PayloadError } from '@errors';

import { CatalogItemObject } from './catalogs-items.services.types';
import { toCatalogItemObject } from './catalogs-items.services.utils';

import { assertUserAccessToMarket, updateMarketInteractedAt } from '../markets/markets.services';
import { getEntityOrThrow, assertEntityNotExist } from '../../../utils';

export async function getItemOrThrow(id: number): Promise<CatalogItemBaseObject> {
	return await getEntityOrThrow(await Models.getItem(id), 'catalog_item');
}

export async function assertItemNotExist(marketId: number, name: string) {
	await assertEntityNotExist(await Models.getItem(marketId, name), { code: 'NAME_TAKEN', details: { resource: 'catalog_item' } });
}

export async function assertUserAccessToItem(userId: number, itemId: number) {
	await assertUserAccessToMarket(userId, (await getItemOrThrow(itemId)).marketId);
}

export async function assertMarketAccessToItem(marketId: number, itemId: number) {
	if ((await getItemOrThrow(itemId)).marketId !== marketId) {
		throw new PayloadError({ code: 'INVALID_RELATIONS', details: { parent: 'market', child: 'catalog_item' } });
	}
}

export async function getItems(userId: number, marketId: number): Promise<CatalogItemObject[]> {
	await assertUserAccessToMarket(userId, marketId);

	return (await Models.getItems(marketId)).map((item) => toCatalogItemObject(item));
}

export async function createItem(userId: number, marketId: number, name: string, count: number, price: number): Promise<CatalogItemObject> {
	await assertUserAccessToMarket(userId, marketId);
	await assertItemNotExist(marketId, name);
	await updateMarketInteractedAt(marketId);

	return toCatalogItemObject(await Models.createItem(marketId, name, count, price));
}

export async function editItem(userId: number, itemId: number, component: 'count' | 'price', value: number): Promise<number> {
	await assertUserAccessToItem(userId, itemId);

	await Models.editItem(itemId, component, value);

	await updateMarketInteractedAt((await getItemOrThrow(itemId)).marketId);

	return value;
}

export async function removeItem(userId: number, itemId: number): Promise<true> {
	const { marketId } = await getItemOrThrow(itemId);

	await assertUserAccessToItem(userId, itemId);

	await Models.removeItem(itemId);

	await updateMarketInteractedAt(marketId);

	return true;
}

export async function shiftItemsPrices(userId: number, marketId: number, value: number): Promise<true> {
	await assertUserAccessToMarket(userId, marketId);

	await Models.shiftItemsPrices(marketId, value);

	await updateMarketInteractedAt(marketId);

	return true;
}
