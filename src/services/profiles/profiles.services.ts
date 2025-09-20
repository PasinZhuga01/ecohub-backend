import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserObject } from 'ecohub-shared/db';
import { PayloadError } from '@errors';
import { Profiles as Models } from '@models';
import env from '@config/env';

import { getEntityOrThrow, assertEntityNotExist } from '../utils';

async function getUserOrThrow(id: number): Promise<UserObject>;
async function getUserOrThrow(login: string): Promise<UserObject>;

async function getUserOrThrow(identifier: number | string): Promise<UserObject> {
	return await getEntityOrThrow(
		await (typeof identifier === 'number' ? Models.getUser(identifier) : Models.getUser(identifier)),
		'profile'
	);
}

async function assertUserNotExist(login: string) {
	await assertEntityNotExist(await Models.getUser(login), { code: 'LOGIN_TAKEN' });
}

async function assertUserCredentials(login: string, password: string) {
	const user = await Models.getUser(login);

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

export async function getUserLogin(id: number): Promise<string> {
	return (await getUserOrThrow(id)).login;
}

export async function registerUser(login: string, password: string): Promise<string> {
	await assertUserNotExist(login);

	return await signJwt((await Models.createUser(login, await hashPassword(password))).id);
}

export async function loginUser(login: string, password: string): Promise<string> {
	await assertUserCredentials(login, password);

	return await signJwt((await getUserOrThrow(login)).id);
}
