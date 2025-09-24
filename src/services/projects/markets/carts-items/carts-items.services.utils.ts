import { CartItemObject as CartItemBaseObject } from 'ecohub-shared/db/projects/markets';

import { CartItemObject } from './carts-items.services.types';

import { pickObject } from '../../../utils';

export function toCartItemObject(object: CartItemBaseObject): CartItemObject {
	return pickObject(object, ['id', 'catalogItemId', 'count']);
}
