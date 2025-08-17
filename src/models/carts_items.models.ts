import { CartItemObject, cartItemSchema } from './carts_items.models.schemas';
import { ModelsUtility } from './utility';

import db from '../config/db';

const utility = new ModelsUtility(cartItemSchema, 'cart item');

export async function getItem(id: number): Promise<CartItemObject | null> {
	return await utility.getEntity(`SELECT * FROM carts_items WHERE id = ?`, [id]);
}

export async function getItems(marketId: number): Promise<CartItemObject[]> {
	return await utility.getEntities('SELECT * FROM carts_items WHERE market_id = ?', [marketId]);
}

export async function createItem(marketId: number, catalogItemId: number): Promise<CartItemObject> {
	return await utility.createEntity(
		'INSERT INTO carts_items (market_id, catalog_item_id) VALUES (?, ?)',
		[marketId, catalogItemId],
		getItem
	);
}

export async function recountItem(id: number, count: number) {
	await db.execute(`UPDATE carts_items SET count = ? WHERE id = ?`, [count, id]);
}

export async function removeItem(id: number) {
	await db.execute('DELETE FROM carts_items WHERE id = ?', [id]);
}

export async function clearItems(marketId: number) {
	await db.execute('DELETE FROM carts_items WHERE market_id = ?', [marketId]);
}
