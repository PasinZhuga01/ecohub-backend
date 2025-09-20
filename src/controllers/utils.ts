import { codes } from 'ecohub-shared/http/payloads';
import { PayloadError } from '@errors';

import { Response } from './types';

export async function safePayload<T extends object>(res: Response<T>, callback: () => Promise<T>) {
	try {
		res.json(await callback());
	} catch (error) {
		if (!(error instanceof PayloadError)) {
			throw error;
		}

		res.status(codes[error.payload.code]).json(error.payload);
	}
}
