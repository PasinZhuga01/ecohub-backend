import { ErrorsPayload, Resource } from '../types';
import { PayloadError } from '../errors';

export async function getEntityOrThrow<T extends object>(entity: T | null, resource: Resource): Promise<T> {
	if (entity === null) {
		throw new PayloadError({ code: 'NOT_FOUND', details: { resource } });
	}

	return entity;
}

export async function assertEntityNotExist(entity: object | null, payload: ErrorsPayload) {
	if (entity !== null) {
		throw new PayloadError(payload);
	}
}
