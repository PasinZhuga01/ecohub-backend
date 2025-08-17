import { z } from 'zod';

import db from '../config/db';
import { DatabaseError } from '../errors';

export class ModelsUtility<T extends z.ZodType> {
	private readonly _schema: T;
	private readonly _itemName: string;

	public constructor(schema: T, itemName: string) {
		this._schema = schema;
		this._itemName = itemName;
	}

	public async getEntity(sql: string, values: unknown[]): Promise<z.output<T> | null> {
		const [rows] = await db.query(sql, values);

		return Array.isArray(rows) && rows.length > 0 ? this._schema.parse(rows[0]) : null;
	}

	public async getEntities(sql: string, values: unknown[]): Promise<z.output<T>[]> {
		const [rows] = await db.query(sql, values);

		if (!Array.isArray(rows)) {
			throw new DatabaseError(`Failed to retrieve ${this._itemName} list`);
		}

		return rows.map((row) => this._schema.parse(row));
	}

	public async createEntity(
		sql: string,
		values: unknown[],
		getCreatedEntity: (id: number) => Promise<z.output<T> | null>
	): Promise<z.output<T>> {
		const [result] = await db.execute(sql, values);

		if (!('insertId' in result) || typeof result.insertId !== 'number') {
			throw new DatabaseError(`Failed to retrieve created ${this._itemName} insertId`);
		}

		const entity = await getCreatedEntity(result.insertId);

		if (entity === null) {
			throw new DatabaseError(`Failed to retrieve created ${this._itemName} with id = ${result.insertId}`);
		}

		return entity;
	}
}
