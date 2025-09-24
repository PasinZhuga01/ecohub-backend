import { ProjectObject } from 'ecohub-shared/db/projects';

import { MarketNavObject } from '../markets/markets/markets.services.schemas';
import { pickObject, toStringDate } from '../../utils';

export type ProjectNavObject = Pick<ProjectObject, 'id' | 'name'> & { markets: MarketNavObject[] };
export type ProjectPageObject = Pick<ProjectObject, 'id' | 'name'> & { interactedAt: string };

export function toProjectNavObject(object: ProjectObject): ProjectNavObject {
	return { ...pickObject(object, ['id', 'name']), markets: [] };
}

export function toProjectPageObject(object: ProjectObject): ProjectPageObject {
	return { ...pickObject(object, ['id', 'name']), interactedAt: toStringDate(object.interactedAt) };
}
