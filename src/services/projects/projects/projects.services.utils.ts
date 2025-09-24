import { ProjectObject } from 'ecohub-shared/db/projects';

import { ProjectNavObject, ProjectPageObject } from './projects.services.types';

import { pickObject, toStringDate } from '../../utils';

export function toProjectNavObject(object: ProjectObject): ProjectNavObject {
	return { ...pickObject(object, ['id', 'name']), markets: [] };
}

export function toProjectPageObject(object: ProjectObject): ProjectPageObject {
	return { ...pickObject(object, ['id', 'name']), interactedAt: toStringDate(object.interactedAt) };
}
