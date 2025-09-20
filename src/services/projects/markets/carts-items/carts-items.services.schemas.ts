import { CartsItemsSchemas as Schemas } from '@models';

import { pickObject } from '../../../utils';

export type CartItemObject = Pick<Schemas.CartItemObject, 'id' | 'catalogItemId' | 'count'>;

export function toCartItemObject(object: Schemas.CartItemObject): CartItemObject {
	return pickObject(object, ['id', 'catalogItemId', 'count']);
}
