import { ErrorCodes } from '../constants/http';
import { ErrorPayload, ErrorResponse } from '../types/http';

export function getErrorResponse(payload: ErrorPayload): ErrorResponse {
	return { status: ErrorCodes[payload.code], ...payload };
}
