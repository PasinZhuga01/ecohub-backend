import { CatalogItemObject as CatalogItemBaseObject } from '@models/projects/markets/catalogs-items.models.schemas';

import { pickObject } from '../../utils';

export type CatalogItemObject = Pick<CatalogItemBaseObject, 'id' | 'name' | 'count' | 'price'>;

export function toCatalogItemObject(object: CatalogItemBaseObject): CatalogItemObject {
	return pickObject(object, ['id', 'name', 'count', 'price']);
}
