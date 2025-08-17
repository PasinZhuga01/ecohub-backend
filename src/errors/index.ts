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
