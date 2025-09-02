import fs from 'fs/promises';
import path from 'path';

import { v4 as uuidv4 } from 'uuid';

import { toCurrencyObject, CurrencyObject } from './currencies.services.schemas';
import { assertUserAccessToProject } from './index.services';
import { getMarketsForPage } from './markets/index.services';
import { shiftItemsPrices } from './markets/catalogs_items.services';

import { getEntityOrThrow, assertEntityNotExist } from '../utils';
import {
	getCurrency,
	getCurrencies as getCurrenciesModel,
	createCurrency as createCurrencyModel,
	rerateCurrency as rerateCurrencyModel,
	removeCurrency as removeCurrencyModel,
	shiftCurrenciesRates as shiftCurrenciesRatesModel
} from '../../models/projects/currencies.models';
import { CurrencyObject as CurrencyObjectModel } from '../../models/projects/currencies.models.schemas';
import env from '../../config/env';

export async function getCurrencyOrThrow(id: number): Promise<CurrencyObjectModel> {
	return await getEntityOrThrow(await getCurrency(id), 'currency');
}

export async function assertCurrencyNotExist(projectId: number, name: string) {
	await assertEntityNotExist(await getCurrency(projectId, name), { code: 'NAME_TAKEN', details: { resource: 'currency' } });
}

export async function assertUserAccessToCurrency(userId: number, currencyId: number) {
	await assertUserAccessToProject(userId, (await getCurrencyOrThrow(currencyId)).projectId);
}

export async function getCurrencies(userId: number, projectId: number): Promise<CurrencyObject[]> {
	await assertUserAccessToProject(userId, projectId);

	return (await getCurrenciesModel(projectId)).map((currency) => toCurrencyObject(currency));
}

export async function createCurrency(
	userId: number,
	projectId: number,
	icon: Express.Multer.File,
	name: string,
	rate: number
): Promise<CurrencyObject> {
	await assertUserAccessToProject(userId, projectId);
	await assertCurrencyNotExist(projectId, name);

	const iconSrc = await saveIcon(icon);

	return toCurrencyObject(await createCurrencyModel(projectId, iconSrc, name, rate));
}

export async function rerateCurrency(userId: number, currencyId: number, rate: number): Promise<number> {
	await assertUserAccessToCurrency(userId, currencyId);
	await rerateCurrencyModel(currencyId, rate);

	return rate;
}

export async function removeCurrency(userId: number, currencyId: number): Promise<true> {
	await assertUserAccessToCurrency(userId, currencyId);
	await removeCurrencyModel(currencyId);

	return true;
}

export async function shiftCurrenciesRates(userId: number, projectId: number, value: number): Promise<true> {
	await assertUserAccessToProject(userId, projectId);
	await shiftCurrenciesRatesModel(projectId, value);

	for (const market of await getMarketsForPage(userId, projectId)) {
		await shiftItemsPrices(userId, market.id, value);
	}

	return true;
}

export async function saveIcon(file: Express.Multer.File): Promise<string> {
	const filename = uuidv4() + path.extname(file.originalname);
	const filepath = path.join(env.uploadsPath, filename);

	await fs.writeFile(filepath, file.buffer);

	return filename;
}
