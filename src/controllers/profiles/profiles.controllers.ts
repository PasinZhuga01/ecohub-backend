import { ProfilesApi, Request as RequestBody, Response as ResponseBody } from 'ecohub-shared/http/api';
import { Profiles as Services } from '@services';

import { safePayload } from '../utils';
import { Request, Response, ResponseWithSession } from '../types';

export async function auth(req: Request<RequestBody<ProfilesApi, '/auth'>>, res: Response<ResponseBody<ProfilesApi, '/auth'>>) {
	await safePayload(res, async () => {
		const { isRegister, login, password } = req.body;

		if (isRegister) {
			return { token: await Services.registerUser(login, password) };
		}

		return { token: await Services.loginUser(login, password) };
	});
}

export async function get(_: Request<RequestBody<ProfilesApi, '/get'>>, res: ResponseWithSession<ResponseBody<ProfilesApi, '/get'>>) {
	await safePayload(res, async () => {
		return { login: await Services.getUserLogin(res.locals.userId) };
	});
}
