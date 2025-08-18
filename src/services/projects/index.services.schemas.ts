import { MarketNavObject } from './markets/index.services.schemas';

import { pickObject } from '../utils';

import { ProjectObject as ProjectBaseObject } from '../../models/projects/index.models.schemas';

export type ProjectNavObject = Pick<ProjectBaseObject, 'id' | 'name'> & { markets: MarketNavObject[] };
export type ProjectPageObject = Pick<ProjectBaseObject, 'id' | 'name' | 'interactedAt'>;

export function toProjectNavObject(object: ProjectBaseObject): ProjectNavObject {
	return { ...pickObject(object, ['id', 'name']), markets: [] };
}

export function toProjectPageObject(object: ProjectBaseObject): ProjectPageObject {
	return pickObject(object, ['id', 'name', 'interactedAt']);
}
