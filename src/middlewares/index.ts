import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, RequestHandler, Response } from 'express';

import { ErrorCodes } from '../constants/http';
import { ErrorPayload } from '../types/http';
import env from '../config/env';

export function createRequestSchemaValidator(
	schema: z.ZodType,
	isFromQuery: boolean = false,
	isUpdateBody?: boolean
): RequestHandler<object, ErrorPayload> {
	return async function (req, res, next) {
		const result = await schema.safeParseAsync(isFromQuery ? req.query : req.body);

		if (!result.success) {
			const targets = result.error.issues.map((error) => ({
				path: error.path.map(String),
				message: error.message
			}));

			return res.status(ErrorCodes['INVALID_FORMAT']).json({ code: 'INVALID_FORMAT', details: { targets } });
		}

		if ((isFromQuery && isUpdateBody === undefined) || isUpdateBody) {
			req.body = result.data;
		}

		return next();
	};
}

export function verifySessionToken(req: Request, res: Response<ErrorPayload, { userId?: number }>, next: NextFunction) {
	const authHeaderRaw = req.headers['authorization'] || req.headers['Authorization'];
	const authHeader = Array.isArray(authHeaderRaw) ? authHeaderRaw[0] : authHeaderRaw;

	if (!authHeader) {
		return res.status(401).json({ code: 'INVALID_SESSION' });
	}

	if (!authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ code: 'INVALID_SESSION' });
	}

	const token = authHeader.slice(7);
	const object = jwt.verify(token, env.jwt.secretKey) as unknown;

	if (typeof object !== 'object' || object === null || !('id' in object) || typeof object.id !== 'number') {
		return res.status(401).json({ code: 'INVALID_SESSION' });
	}

	res.locals.userId = object.id;

	return next();
}
