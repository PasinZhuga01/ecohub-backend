import { ErrorsPayload, Resource } from '../types';
import { PayloadError } from '../errors';

export async function getEntityOrThrow<T extends object>(callback: () => Promise<T | null>, resource: Resource): Promise<T> {
	const entity = await callback();

	if (entity === null) {
		throw new PayloadError({ code: 'NOT_FOUND', details: { resource } });
	}

	return entity;
}

export async function assertEntityNotExist(target: object | null, payload: ErrorsPayload) {
	if (target !== null) {
		throw new PayloadError(payload);
	}
}
