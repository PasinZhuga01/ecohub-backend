import { userSchema, UserObject } from 'ecohub-shared/db';

import { ModelsUtility } from '../utility';

const utility = new ModelsUtility<UserObject, 'login' | 'password'>(userSchema, 'users', 'user');

export async function getUser(id: number): Promise<UserObject | null>;
export async function getUser(login: string): Promise<UserObject | null>;

export async function getUser(identifier: string | number): Promise<UserObject | null> {
	return await utility.getEntity(typeof identifier === 'number' ? { id: identifier } : { login: identifier });
}

export async function createUser(login: string, password: string): Promise<UserObject> {
	return await utility.createEntity({ login, password });
}
