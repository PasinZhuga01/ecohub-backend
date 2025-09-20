import { CatalogsItemsSchemas as Schemas } from '@models';

import { pickObject } from '../../../utils';

export type CatalogItemObject = Pick<Schemas.CatalogItemObject, 'id' | 'name' | 'count' | 'price'>;

export function toCatalogItemObject(object: Schemas.CatalogItemObject): CatalogItemObject {
	return pickObject(object, ['id', 'name', 'count', 'price']);
}
