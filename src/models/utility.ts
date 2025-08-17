import { z } from 'zod';

import { IdentifiedObject } from './facade';

import db from '../config/db';
import { DatabaseError } from '../errors';

export class ModelsUtility<T extends z.ZodType<IdentifiedObject, IdentifiedObject>, C extends keyof z.input<T>> {
	private readonly _schema: T;

	private readonly _tableName: string;
	private readonly _tableItemName: string;

	public constructor(schema: T, tableName: string, tableItemName: string) {
		this._schema = schema;
		this._tableName = tableName;
		this._tableItemName = tableItemName;
	}

	public async getEntity(data: Partial<z.input<T>>): Promise<z.output<T> | null> {
		ModelsUtility._assertObjectNotEmpty(data);

		return (await this.getEntities(data, { count: 1 }))[0] ?? null;
	}

	public async getEntities(
		data: Partial<z.input<T>>,
		options: Partial<{ orderKey: keyof z.input<T>; count: number }> = {}
	): Promise<z.output<T>[]> {
		ModelsUtility._assertObjectNotEmpty(data);

		const where = ModelsUtility._toSqlClause(data);
		const values = Object.values(data);
		const limit = options.count !== undefined && isFinite(options.count) ? 'LIMIT ?' : '';
		const order = options.orderKey !== undefined ? `ORDER BY ${String(options.orderKey)} DESC` : '';

		if (options.count !== undefined) {
			values.push(options.count);
		}

		const [rows] = await db.query(`SELECT * FROM ${this._tableName} WHERE ${where} ${order} ${limit}`, values);

		if (!Array.isArray(rows)) {
			throw new DatabaseError(`Failed to retrieve ${this._tableItemName} list`);
		}

		return rows.map((row) => this._schema.parse(row));
	}

	public async createEntity(data: Pick<z.input<T>, C>): Promise<z.output<T>> {
		ModelsUtility._assertObjectNotEmpty(data);

		const keys = Object.keys(data).join(', ');
		const values = Object.values(data);
		const inserts = new Array(values.length).fill('?').join(', ');

		const [result] = await db.execute(`INSERT INTO ${this._tableName} (${keys}) VALUES (${inserts})`, values);

		if (!('insertId' in result) || typeof result.insertId !== 'number') {
			throw new DatabaseError(`Failed to retrieve created ${this._tableItemName} insertId`);
		}

		const entity = await this.getEntity({ id: result.insertId } as Partial<z.input<T>>);

		if (entity === null) {
			throw new DatabaseError(`Failed to retrieve created ${this._tableItemName} with id = ${result.insertId}`);
		}

		return entity;
	}

	public async updateEntities(filter: Partial<z.input<T>>, data: Partial<z.input<T>>) {
		ModelsUtility._assertObjectNotEmpty(filter);
		ModelsUtility._assertObjectNotEmpty(data);

		const set = ModelsUtility._toSqlClause(data);
		const where = ModelsUtility._toSqlClause(filter);
		const values = Object.values(data).concat(...Object.values(filter));

		await db.execute(`UPDATE ${this._tableName} SET ${set} WHERE ${where}`, values);
	}

	public async removeEntities(data: Partial<z.input<T>>) {
		ModelsUtility._assertObjectNotEmpty(data);

		const where = ModelsUtility._toSqlClause(data);
		const values = Object.values(data);

		await db.execute(`DELETE FROM ${this._tableName} WHERE ${where}`, values);
	}

	private static _toSqlClause(data: object): string {
		return Object.keys(data)
			.map((key) => `${key} = ?`)
			.join(' AND ');
	}

	private static _assertObjectNotEmpty(object: object) {
		if (Object.keys(object).length === 0) {
			throw new DatabaseError('Failed to call method - parameters object is empty');
		}
	}
}
