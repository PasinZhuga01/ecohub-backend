import { ErrorPayload, Resource } from 'ecohub-shared/types/http';
import { PayloadError } from '@errors/index';

export async function getEntityOrThrow<T extends object>(entity: T | null, resource: Resource): Promise<T> {
	if (entity === null) {
		throw new PayloadError({ code: 'NOT_FOUND', details: { resource } });
	}

	return entity;
}

export async function assertEntityNotExist(entity: object | null, payload: ErrorPayload) {
	if (entity !== null) {
		throw new PayloadError(payload);
	}
}

export function pickObject<T extends object, K extends keyof T>(object: T, keys: K[]): Pick<T, K> {
	const result: Partial<Pick<T, K>> = {};

	for (const key of keys) {
		result[key] = object[key];
	}

	return result as Pick<T, K>;
}

export function toStringDate(date: Date): string {
	const pad = (n: number) => n.toString().padStart(2, '0');

	const day = pad(date.getDate());
	const month = pad(date.getMonth() + 1);
	const year = date.getFullYear();

	const hours = pad(date.getHours());
	const minutes = pad(date.getMinutes());

	return `${day}.${month}.${year} ${hours}:${minutes}`;
}
