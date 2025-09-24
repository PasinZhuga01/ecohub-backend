import { CartItemObject as CartItemBaseObject } from 'ecohub-shared/db/projects/markets';

export type CartItemObject = Pick<CartItemBaseObject, 'id' | 'catalogItemId' | 'count'>;
