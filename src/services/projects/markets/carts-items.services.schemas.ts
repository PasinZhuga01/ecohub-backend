import { CartItemObject as CartItemBaseObject } from '@models/projects/markets/carts-items.models.schemas';

import { pickObject } from '../../utils';

export type CartItemObject = Pick<CartItemBaseObject, 'id' | 'catalogItemId' | 'count'>;

export function toCartItemObject(object: CartItemBaseObject): CartItemObject {
	return pickObject(object, ['id', 'catalogItemId', 'count']);
}
