import {
	getItem,
	getItems as getItemsModel,
	createItem as createItemModel,
	editItem as editItemModel,
	removeItem as removeItemModel,
	shiftItemsPrices as shiftItemsPricesModel
} from '@models/projects/markets/catalogs_items.models';
import { CatalogItemObject as CatalogItemObjectModel } from '@models/projects/markets/catalogs_items.models.schemas';
import { PayloadError } from '@errors/index';

import { toCatalogItemObject, CatalogItemObject } from './catalogs_items.services.schemas';
import { assertUserAccessToMarket } from './index.services';

import { getEntityOrThrow, assertEntityNotExist } from '../../utils';

export async function getItemOrThrow(id: number): Promise<CatalogItemObjectModel> {
	return await getEntityOrThrow(await getItem(id), 'catalog_item');
}

export async function assertItemNotExist(marketId: number, name: string) {
	await assertEntityNotExist(await getItem(marketId, name), { code: 'NAME_TAKEN', details: { resource: 'catalog_item' } });
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

	return (await getItemsModel(marketId)).map((item) => toCatalogItemObject(item));
}

export async function createItem(userId: number, marketId: number, name: string, count: number, price: number): Promise<CatalogItemObject> {
	await assertUserAccessToMarket(userId, marketId);
	await assertItemNotExist(marketId, name);

	return toCatalogItemObject(await createItemModel(marketId, name, count, price));
}

export async function editItem(userId: number, itemId: number, component: 'count' | 'price', value: number): Promise<number> {
	await assertUserAccessToItem(userId, itemId);
	await editItemModel(itemId, component, value);

	return value;
}

export async function removeItem(userId: number, itemId: number): Promise<true> {
	await assertUserAccessToItem(userId, itemId);
	await removeItemModel(itemId);

	return true;
}

export async function shiftItemsPrices(userId: number, marketId: number, value: number): Promise<true> {
	await assertUserAccessToMarket(userId, marketId);
	await shiftItemsPricesModel(marketId, value);

	return true;
}
