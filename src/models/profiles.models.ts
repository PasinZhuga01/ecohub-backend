import { UserObject, user as userSchema } from './facade';

import { DatabaseError } from '../errors';
import db from '../config/db';

export async function getUser(id: number): Promise<UserObject | null>;
export async function getUser(login: string): Promise<UserObject | null>;

export async function getUser(value: number | string) {
	const key = typeof value === 'number' ? 'id' : 'login';
	const [rows] = await db.query(`SELECT * FROM users WHERE ${key} = ?`, [value]);

	return Array.isArray(rows) && rows.length > 0 ? userSchema.parse(rows[0]) : null;
}

export async function createUser(login: string, password: string): Promise<UserObject> {
	const [result] = await db.execute('INSERT INTO users (login, password) VALUES (?, ?)', [login, password]);

	if (!('insertId' in result) || typeof result.insertId !== 'number') {
		throw new DatabaseError('Failed to retrieve created user insertId');
	}

	const user = await getUser(result.insertId);

	if (user === null) {
		throw new DatabaseError(`Failed to retrieve created user with id = ${result.insertId}`);
	}

	return user;
}
