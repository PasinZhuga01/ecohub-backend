import { CartItemObject as CartItemBaseObject } from 'ecohub-shared/db/projects/markets';

import { pickObject } from '../../../utils';

export type CartItemObject = Pick<CartItemBaseObject, 'id' | 'catalogItemId' | 'count'>;

export function toCartItemObject(object: CartItemBaseObject): CartItemObject {
	return pickObject(object, ['id', 'catalogItemId', 'count']);
}
