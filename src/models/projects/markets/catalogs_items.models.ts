import { ModelsUtility } from '../../utility';
import { catalogItemSchema, CatalogItemObject } from './catalogs_items.models.schemas';

import db from '../../../config/db';

const utility = new ModelsUtility<typeof catalogItemSchema, 'market_id' | 'name' | 'count' | 'price'>(
	catalogItemSchema,
	'catalogs_items',
	'catalog item'
);

export async function getItem(id: number): Promise<CatalogItemObject | null>;
export async function getItem(marketId: number, name: string): Promise<CatalogItemObject | null>;

export async function getItem(id: number, name?: string): Promise<CatalogItemObject | null> {
	return await utility.getEntity(name !== undefined ? { market_id: id, name } : { id });
}

export async function getItems(marketId: number): Promise<CatalogItemObject[]> {
	return await utility.getEntities({ market_id: marketId });
}

export async function createItem(marketId: number, name: string, count: number, price: number): Promise<CatalogItemObject> {
	return await utility.createEntity({ market_id: marketId, name, count, price });
}

export async function editItem(id: number, component: 'count' | 'price', value: number) {
	await utility.updateEntities({ id }, { [component]: value });
}

export async function removeItem(id: number) {
	await utility.removeEntities({ id });
}

export async function shiftItemsPrices(marketId: number, value: number) {
	await db.execute('UPDATE catalogs_items SET price = price + ? WHERE market_id = ?', [value, marketId]);
}
