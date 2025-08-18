import { pickObject } from '../../utils';

import { CatalogItemObject as CatalogItemBaseObject } from '../../../models/projects/markets/catalogs_items.models.schemas';

export type CatalogItemObject = Pick<CatalogItemBaseObject, 'id' | 'name' | 'count' | 'price'>;

export function toCatalogItemObject(object: CatalogItemBaseObject): CatalogItemObject {
	return pickObject(object, ['id', 'name', 'count', 'price']);
}
