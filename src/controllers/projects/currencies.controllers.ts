import { CurrenciesApi, Request as RequestBody, Response as ResponseBody } from 'ecohub-shared/schemas/api';
import {
	getCurrencies,
	createCurrency,
	rerateCurrency,
	removeCurrency,
	shiftCurrenciesRates
} from '@services/projects/currencies.services';

import { safePayload } from '../utils';
import { Request, ResponseWithSession } from '../types';

export async function get(req: Request<RequestBody<CurrenciesApi, '/get'>>, res: ResponseWithSession<ResponseBody<CurrenciesApi, '/get'>>) {
	await safePayload(res, async () => await getCurrencies(res.locals.userId, req.body.projectId));
}

export async function create(
	req: Request<RequestBody<CurrenciesApi, '/create'>>,
	res: ResponseWithSession<ResponseBody<CurrenciesApi, '/create'>>
) {
	await safePayload(
		res,
		async () => await createCurrency(res.locals.userId, req.body.projectId, req.file!, req.body.name, req.body.rate)
	);
}

export async function rerate(
	req: Request<RequestBody<CurrenciesApi, '/rerate'>>,
	res: ResponseWithSession<ResponseBody<CurrenciesApi, '/rerate'>>
) {
	await safePayload(res, async () => ({ rate: await rerateCurrency(res.locals.userId, req.body.id, req.body.rate) }));
}

export async function remove(
	req: Request<RequestBody<CurrenciesApi, '/remove'>>,
	res: ResponseWithSession<ResponseBody<CurrenciesApi, '/remove'>>
) {
	await safePayload(res, async () => ({ success: await removeCurrency(res.locals.userId, req.body.id) }));
}

export async function shift(
	req: Request<RequestBody<CurrenciesApi, '/shift'>>,
	res: ResponseWithSession<ResponseBody<CurrenciesApi, '/shift'>>
) {
	await safePayload(res, async () => ({ success: await shiftCurrenciesRates(res.locals.userId, req.body.projectId, req.body.value) }));
}
