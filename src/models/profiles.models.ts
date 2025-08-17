import { UserObject, user as userSchema } from './facade';
import { ModelsUtility } from './utility';

const utility = new ModelsUtility(userSchema, 'user');

export async function getUser(id: number): Promise<UserObject | null>;
export async function getUser(login: string): Promise<UserObject | null>;

export async function getUser(value: number | string): Promise<UserObject | null> {
	const key = typeof value === 'number' ? 'id' : 'login';

	return await utility.getEntity(`SELECT * FROM users WHERE ${key} = ?`, [value]);
}

export async function createUser(login: string, password: string): Promise<UserObject> {
	return await utility.createEntity('INSERT INTO users (login, password) VALUES (?, ?)', [login, password], getUser);
}
