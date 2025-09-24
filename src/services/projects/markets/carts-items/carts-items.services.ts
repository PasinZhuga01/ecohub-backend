import { CartItemObject as CartItemBaseObject } from 'ecohub-shared/db/projects/markets';
import { CartsItems as Models } from '@models/projects/markets';

import { CartItemObject } from './carts-items.services.types';
import { toCartItemObject } from './carts-items.services.utils';

import { assertMarketAccessToItem } from '../catalogs-items/catalogs-items.services';
import { assertUserAccessToMarket, updateMarketInteractedAt } from '../markets/markets.services';
import { getEntityOrThrow } from '../../../utils';

export async function getItemOrThrow(id: number): Promise<CartItemBaseObject> {
	return await getEntityOrThrow(await Models.getItem(id), 'cart_item');
}

export async function assertUserAccessToItem(userId: number, itemId: number) {
	await assertUserAccessToMarket(userId, (await getItemOrThrow(itemId)).marketId);
}

export async function getItems(userId: number, marketId: number): Promise<CartItemObject[]> {
	await assertUserAccessToMarket(userId, marketId);

	return (await Models.getItems(marketId)).map((item) => toCartItemObject(item));
}

export async function addItem(userId: number, marketId: number, catalogItemId: number): Promise<CartItemObject> {
	await assertUserAccessToMarket(userId, marketId);
	await assertMarketAccessToItem(marketId, catalogItemId);

	const item = await Models.getItem(marketId, catalogItemId);

	if (item !== null) {
		await recountItem(userId, item.id, item.count + 1);

		return toCartItemObject(await getItemOrThrow(item.id));
	}

	await updateMarketInteractedAt(marketId);

	return toCartItemObject(await Models.createItem(marketId, catalogItemId));
}

export async function recountItem(userId: number, itemId: number, count: number): Promise<number> {
	await assertUserAccessToItem(userId, itemId);

	await Models.recountItem(itemId, count);

	await updateMarketInteractedAt((await getItemOrThrow(itemId)).marketId);

	return count;
}

export async function removeItem(userId: number, itemId: number): Promise<true> {
	const { marketId } = await getItemOrThrow(itemId);

	await assertUserAccessToItem(userId, itemId);

	await Models.removeItem(itemId);

	await updateMarketInteractedAt(marketId);

	return true;
}

export async function clearItems(userId: number, marketId: number): Promise<true> {
	await assertUserAccessToMarket(userId, marketId);

	await Models.clearItems(marketId);

	await updateMarketInteractedAt(marketId);

	return true;
}
