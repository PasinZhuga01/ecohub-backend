import { ErrorPayload } from 'ecohub-shared/http/types';
import { BaseError } from 'ecohub-shared/errors';

export class PayloadError extends BaseError {
	public readonly payload: ErrorPayload;

	public constructor(payload: ErrorPayload) {
		super('PayloadError', '');
		this.payload = payload;
	}
}
