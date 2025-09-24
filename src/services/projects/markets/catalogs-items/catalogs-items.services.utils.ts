import { CatalogItemObject as CatalogItemBaseObject } from 'ecohub-shared/db/projects/markets';

import { CatalogItemObject } from './catalogs-items.services.types';

import { pickObject } from '../../../utils';

export function toCatalogItemObject(object: CatalogItemBaseObject): CatalogItemObject {
	return pickObject(object, ['id', 'name', 'count', 'price']);
}
