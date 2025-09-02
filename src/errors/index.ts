import { ErrorPayload } from '@app-types/http';

abstract class BaseError extends Error {
	protected constructor(name: string, message: string) {
		super(message);
		this.name = name;
	}
}

export class DatabaseError extends BaseError {
	public constructor(message: string) {
		super('DatabaseError', message);
	}
}

export class PayloadError extends BaseError {
	public readonly payload: ErrorPayload;

	public constructor(payload: ErrorPayload) {
		super('PayloadError', '');
		this.payload = payload;
	}
}
