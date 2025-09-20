import { ErrorPayload } from 'ecohub-shared/http/payloads';
import { BaseError } from 'ecohub-shared/errors';

export class PayloadError extends BaseError {
	public readonly payload: ErrorPayload;

	public constructor(payload: ErrorPayload) {
		super('PayloadError', '');
		this.payload = payload;
	}
}
