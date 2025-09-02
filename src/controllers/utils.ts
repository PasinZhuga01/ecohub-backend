import { PayloadError } from '@errors/index';
import { ErrorCodes } from '@constants/http';

import { Response } from './types';

export async function safePayload<T extends object>(res: Response<T>, callback: () => Promise<T>) {
	try {
		res.json(await callback());
	} catch (error) {
		if (!(error instanceof PayloadError)) {
			throw error;
		}

		res.status(ErrorCodes[error.payload.code]).json(error.payload);
	}
}
