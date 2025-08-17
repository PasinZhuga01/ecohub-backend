import { CurrencyObject, currencySchema } from './currencies.models.schemas';
import { ModelsUtility } from './utility';

import db from '../config/db';

const utility = new ModelsUtility(currencySchema, 'currency');

export async function getCurrency(id: number): Promise<CurrencyObject | null>;
export async function getCurrency(projectId: number, name: string): Promise<CurrencyObject | null>;

export async function getCurrency(id: number, name?: string): Promise<CurrencyObject | null> {
	const where = name !== undefined ? 'project_id = ? AND name = ?' : 'id = ?';
	const values = name !== undefined ? [id, name] : [id];

	return await utility.getEntity(`SELECT * FROM currencies WHERE ${where}`, values);
}

export async function getCurrencies(projectId: number): Promise<CurrencyObject[]> {
	return utility.getEntities('SELECT * FROM currencies WHERE project_id = ?', [projectId]);
}

export async function createCurrency(projectId: number, iconSrc: string, name: string, rate: number): Promise<CurrencyObject> {
	return utility.createEntity(
		'INSERT INTO currencies (project_id, icon_src, name, rate) VALUES (?, ?, ?, ?)',
		[projectId, iconSrc, name, rate],
		getCurrency
	);
}

export async function rerateCurrency(id: number, rate: number) {
	await db.execute('UPDATE currencies SET rate = ? WHERE id = ?', [rate, id]);
}

export async function removeCurrency(id: number) {
	await db.execute('DELETE FROM currencies WHERE id = ?', [id]);
}

export async function shiftCurrenciesRates(projectId: number, value: number) {
	await db.execute('UPDATE currencies SET rate = rate + ? WHERE project_id = ?', [value, projectId]);
}
