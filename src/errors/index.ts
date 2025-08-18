import { ErrorPayload } from '../types/http';

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

export class PayloadError<T extends ErrorPayload> extends BaseError {
	public readonly payload: T;

	public constructor(payload: T) {
		super('PayloadError', '');
		this.payload = payload;
	}
}
