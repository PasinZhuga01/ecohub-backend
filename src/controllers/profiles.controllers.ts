import { Profiles as Requests } from 'ecohub-shared/schemas/requests';
import { Profiles as Responses } from 'ecohub-shared/schemas/responses';

import { safePayload } from './utils';
import { Request, Response, ResponseWithSession } from './types';

import { registerUser, loginUser, getUserLogin } from '../services/profiles.services';

export async function auth(req: Request<Requests.AuthRequest>, res: Response<Responses.AuthResponse>) {
	await safePayload(res, async () => {
		const { isRegister, login, password } = req.body;

		if (isRegister) {
			return { token: await registerUser(login, password) };
		}

		return { token: await loginUser(login, password) };
	});
}

export async function get(_: Request<object>, res: ResponseWithSession<Responses.GetResponse>) {
	await safePayload(res, async () => {
		return { login: await getUserLogin(res.locals.userId) };
	});
}
