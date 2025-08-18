import { toCartItemObject, CartItemObject } from './carts_items.services.schemas';
import { assertMarketAccessToItem } from './catalogs_items.services';
import { assertUserAccessToMarket } from './index.services';

import { getEntityOrThrow } from '../../utils';

import {
	getItem,
	getItems as getItemsModel,
	createItem as createItemModel,
	recountItem as recountItemModel,
	removeItem as removeItemModel,
	clearItems as clearItemsModel
} from '../../../models/projects/markets/carts_items.models';
import { CartItemObject as CartItemObjectModel } from '../../../models/projects/markets/carts_items.models.schemas';

export async function getItemOrThrow(id: number): Promise<CartItemObjectModel> {
	return await getEntityOrThrow(await getItem(id), 'cart_item');
}

export async function assertUserAccessToItem(userId: number, itemId: number) {
	await assertUserAccessToMarket(userId, (await getItemOrThrow(itemId)).marketId);
}

export async function getItems(userId: number, marketId: number): Promise<CartItemObject[]> {
	await assertUserAccessToMarket(userId, marketId);

	return (await getItemsModel(marketId)).map((item) => toCartItemObject(item));
}

export async function addItem(userId: number, marketId: number, catalogItemId: number): Promise<CartItemObject> {
	await assertUserAccessToMarket(userId, marketId);
	await assertMarketAccessToItem(marketId, catalogItemId);

	const item = await getItem(marketId, catalogItemId);

	if (item !== null) {
		await recountItem(userId, item.id, item.count + 1);

		return toCartItemObject(await getItemOrThrow(item.id));
	}

	return toCartItemObject(await createItemModel(marketId, catalogItemId));
}

export async function recountItem(userId: number, itemId: number, count: number): Promise<number> {
	await assertUserAccessToItem(userId, itemId);
	await recountItemModel(itemId, count);

	return count;
}

export async function removeItem(userId: number, itemId: number): Promise<boolean> {
	await assertUserAccessToItem(userId, itemId);
	await removeItemModel(itemId);

	return true;
}

export async function clearItems(userId: number, marketId: number): Promise<boolean> {
	await assertUserAccessToMarket(userId, marketId);
	await clearItemsModel(marketId);

	return true;
}
