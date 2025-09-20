import { ProjectsSchemas as Schemas } from '@models';

import { MarketNavObject } from './markets/markets.services.schemas';

import { pickObject, toStringDate } from '../utils';

export type ProjectNavObject = Pick<Schemas.ProjectObject, 'id' | 'name'> & { markets: MarketNavObject[] };
export type ProjectPageObject = Pick<Schemas.ProjectObject, 'id' | 'name'> & { interactedAt: string };

export function toProjectNavObject(object: Schemas.ProjectObject): ProjectNavObject {
	return { ...pickObject(object, ['id', 'name']), markets: [] };
}

export function toProjectPageObject(object: Schemas.ProjectObject): ProjectPageObject {
	return { ...pickObject(object, ['id', 'name']), interactedAt: toStringDate(object.interactedAt) };
}
