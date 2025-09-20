import fs from 'fs/promises';
import path from 'path';

import { v4 as uuidv4 } from 'uuid';
import { Currencies as Models, CurrenciesSchemas as Schemas } from '@models';
import env from '@config/env';

import { toCurrencyObject, CurrencyObject } from './currencies.services.schemas';

import { assertUserAccessToProject, updateProjectInteractedAt } from '../projects.services';
import { getMarketsForPage } from '../markets/markets.services';
import { shiftItemsPrices } from '../markets/catalogs-items/catalogs-items.services';
import { getEntityOrThrow, assertEntityNotExist } from '../../utils';

export async function getCurrencyOrThrow(id: number): Promise<Schemas.CurrencyObject> {
	return await getEntityOrThrow(await Models.getCurrency(id), 'currency');
}

export async function assertCurrencyNotExist(projectId: number, name: string) {
	await assertEntityNotExist(await Models.getCurrency(projectId, name), { code: 'NAME_TAKEN', details: { resource: 'currency' } });
}

export async function assertUserAccessToCurrency(userId: number, currencyId: number) {
	await assertUserAccessToProject(userId, (await getCurrencyOrThrow(currencyId)).projectId);
}

export async function getCurrencies(userId: number, projectId: number): Promise<CurrencyObject[]> {
	await assertUserAccessToProject(userId, projectId);

	return (await Models.getCurrencies(projectId)).map((currency) => toCurrencyObject(currency));
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
	await updateProjectInteractedAt(projectId);

	const iconSrc = await saveIcon(icon);

	return toCurrencyObject(await Models.createCurrency(projectId, iconSrc, name, rate));
}

export async function rerateCurrency(userId: number, currencyId: number, rate: number): Promise<number> {
	await assertUserAccessToCurrency(userId, currencyId);

	await Models.rerateCurrency(currencyId, rate);

	await updateProjectInteractedAt((await getCurrencyOrThrow(currencyId)).projectId);

	return rate;
}

export async function removeCurrency(userId: number, currencyId: number): Promise<true> {
	await assertUserAccessToCurrency(userId, currencyId);

	const { iconSrc, projectId } = await getCurrencyOrThrow(currencyId);

	await removeIcon(iconSrc);

	await Models.removeCurrency(currencyId);

	await updateProjectInteractedAt(projectId);

	return true;
}

export async function shiftCurrenciesRates(userId: number, projectId: number, value: number): Promise<true> {
	await assertUserAccessToProject(userId, projectId);

	await Models.shiftCurrenciesRates(projectId, value);

	for (const market of await getMarketsForPage(userId, projectId)) {
		await shiftItemsPrices(userId, market.id, value);
	}

	await updateProjectInteractedAt(projectId);

	return true;
}

export async function saveIcon(file: Express.Multer.File): Promise<string> {
	const filename = uuidv4() + path.extname(file.originalname);
	const filepath = path.join(env.uploadsPath, filename);

	await fs.writeFile(filepath, file.buffer);

	return filename;
}

export async function removeIcon(filename: string) {
	await fs.unlink(path.join(env.uploadsPath, filename));
}
