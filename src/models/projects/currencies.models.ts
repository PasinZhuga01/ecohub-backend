import db from '@config/db';

import { currencySchema, CurrencyObject } from './currencies.models.schemas';

import { ModelsUtility } from '../utility';

const utility = new ModelsUtility<typeof currencySchema, 'project_id' | 'icon_src' | 'name' | 'rate'>(
	currencySchema,
	'currencies',
	'currency'
);

export async function getCurrency(id: number): Promise<CurrencyObject | null>;
export async function getCurrency(projectId: number, name: string): Promise<CurrencyObject | null>;

export async function getCurrency(id: number, name?: string): Promise<CurrencyObject | null> {
	return await utility.getEntity(name !== undefined ? { project_id: id, name } : { id });
}

export async function getCurrencies(projectId: number): Promise<CurrencyObject[]> {
	return await utility.getEntities({ project_id: projectId });
}

export async function createCurrency(projectId: number, iconSrc: string, name: string, rate: number): Promise<CurrencyObject> {
	return await utility.createEntity({ project_id: projectId, icon_src: iconSrc, name, rate });
}

export async function rerateCurrency(id: number, rate: number) {
	await utility.updateEntities({ id }, { rate });
}

export async function removeCurrency(id: number) {
	await utility.removeEntities({ id });
}

export async function shiftCurrenciesRates(projectId: number, value: number) {
	await db.execute('UPDATE currencies SET rate = rate + ? WHERE project_id = ?', [value, projectId]);
}
