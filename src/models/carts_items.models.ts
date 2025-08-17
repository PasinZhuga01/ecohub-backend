import { ModelsUtility } from './utility';
import { cartItemSchema, CartItemObject } from './carts_items.models.schemas';

const utility = new ModelsUtility<typeof cartItemSchema, 'market_id' | 'catalog_item_id'>(cartItemSchema, 'carts_items', 'cart item');

export async function getItem(id: number): Promise<CartItemObject | null> {
	return await utility.getEntity({ id });
}

export async function getItems(marketId: number): Promise<CartItemObject[]> {
	return await utility.getEntities({ market_id: marketId });
}

export async function createItem(marketId: number, catalogItemId: number): Promise<CartItemObject> {
	return await utility.createEntity({ market_id: marketId, catalog_item_id: catalogItemId });
}

export async function recountItem(id: number, count: number) {
	await utility.updateEntities({ id }, { count });
}

export async function removeItem(id: number) {
	await utility.removeEntities({ id });
}

export async function clearItems(marketId: number) {
	await utility.removeEntities({ market_id: marketId });
}
