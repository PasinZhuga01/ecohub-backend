import { CatalogItemObject, catalogItemSchema } from './catalogs_items.models.schemas';
import { ModelsUtility } from './utility';

import db from '../config/db';

const utility = new ModelsUtility(catalogItemSchema, 'catalog item');

export async function getItem(id: number): Promise<CatalogItemObject | null>;
export async function getItem(marketId: number, name: string): Promise<CatalogItemObject | null>;

export async function getItem(id: number, name?: string): Promise<CatalogItemObject | null> {
	const where = name !== undefined ? 'market_id = ? AND name = ?' : 'id = ?';
	const values = name !== undefined ? [id, name] : [id];

	return await utility.getEntity(`SELECT * FROM catalogs_items WHERE ${where}`, values);
}

export async function getItems(marketId: number): Promise<CatalogItemObject[]> {
	return await utility.getEntities('SELECT * FROM catalogs_items WHERE market_id = ?', [marketId]);
}

export async function createItem(marketId: number, name: string, count: number, price: number): Promise<CatalogItemObject> {
	return await utility.createEntity(
		'INSERT INTO catalogs_items (market_id, name, count, price) VALUES (?, ?, ?, ?)',
		[marketId, name, count, price],
		getItem
	);
}

export async function editItem(id: number, component: 'count' | 'price', value: number) {
	await db.execute(`UPDATE catalogs_items SET ${component} = ? WHERE id = ?`, [value, id]);
}

export async function removeItem(id: number) {
	await db.execute('DELETE FROM catalogs_items WHERE id = ?', [id]);
}

export async function shiftItemsPrices(marketId: number, value: number) {
	await db.execute('UPDATE catalogs_items SET price = price + ? WHERE market_id = ?', [value, marketId]);
}
