import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserObject, IdentifiedObject } from '../models/facade';
import { getUser, createUser } from '../models/profiles.models';
import { PayloadError } from '../errors';

import env from '../config/env';

async function getUserOrThrow(login: string): Promise<UserObject> {
	const user = await getUser(login);

	if (user === null) {
		throw new PayloadError({ code: 'NOT_FOUND', details: { resource: 'profile' } });
	}

	return user;
}

async function assertUserNotExist(login: string) {
	if ((await getUser(login)) !== null) {
		throw new PayloadError({ code: 'LOGIN_TAKEN' });
	}
}

async function assertUserCredentials(login: string, password: string) {
	const user = await getUser(login);

	if (user === null || !(await verifyPassword(password, user.password))) {
		throw new PayloadError({ code: 'INVALID_CREDENTIALS' });
	}
}

async function hashPassword(password: string): Promise<string> {
	return await bcrypt.hash(password, env.saltRounds);
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
	return await bcrypt.compare(password, hash);
}

async function signJwt(id: number): Promise<string> {
	return jwt.sign({ id }, env.jwt.secretKey, { expiresIn: env.jwt.expiresIn });
}

export async function verifyJwt(token: string): Promise<IdentifiedObject> {
	return jwt.verify(token, env.jwt.secretKey) as IdentifiedObject;
}

export async function registerUser(login: string, password: string): Promise<string> {
	await assertUserNotExist(login);

	return await signJwt((await createUser(login, await hashPassword(password))).id);
}

export async function loginUser(login: string, password: string): Promise<string> {
	await assertUserCredentials(login, password);

	return await signJwt((await getUserOrThrow(login)).id);
}
