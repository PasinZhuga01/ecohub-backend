import { Response } from 'express';

import { PayloadError } from '../errors';
import { ErrorCodes } from '../constants/http';

export async function safePayload(res: Response, callback: () => Promise<void>) {
	try {
		await callback();
	} catch (error) {
		if (!(error instanceof PayloadError)) {
			throw error;
		}

		res.status(ErrorCodes[error.payload.code]).json(error.payload);
	}
}
