import { BaseError } from 'ecohub-shared/errors';

export class DatabaseError extends BaseError {
	public constructor(message: string) {
		super('DatabaseError', message);
	}
}
