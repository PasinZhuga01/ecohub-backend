import { Currencies as Requests } from 'ecohub-shared/schemas/requests';
import { Currencies as Responses } from 'ecohub-shared/schemas/responses';
import {
	getCurrencies,
	createCurrency,
	rerateCurrency,
	removeCurrency,
	shiftCurrenciesRates
} from '@services/projects/currencies.services';

import { safePayload } from '../utils';
import { Request, ResponseWithSession } from '../types';

export async function get(req: Request<Requests.GetRequest>, res: ResponseWithSession<Responses.GetResponse>) {
	await safePayload(res, async () => await getCurrencies(res.locals.userId, req.body.projectId));
}

export async function create(req: Request<Requests.CreateRequest>, res: ResponseWithSession<Responses.CreateResponse>) {
	await safePayload(
		res,
		async () => await createCurrency(res.locals.userId, req.body.projectId, req.file!, req.body.name, req.body.rate)
	);
}

export async function rerate(req: Request<Requests.RerateRequest>, res: ResponseWithSession<Responses.RerateResponse>) {
	await safePayload(res, async () => ({ rate: await rerateCurrency(res.locals.userId, req.body.id, req.body.rate) }));
}

export async function remove(req: Request<Requests.RemoveRequest>, res: ResponseWithSession<Responses.RemoveResponse>) {
	await safePayload(res, async () => ({ success: await removeCurrency(res.locals.userId, req.body.id) }));
}

export async function shift(req: Request<Requests.ShiftRequest>, res: ResponseWithSession<Responses.ShiftResponse>) {
	await safePayload(res, async () => ({ success: await shiftCurrenciesRates(res.locals.userId, req.body.projectId, req.body.value) }));
}
