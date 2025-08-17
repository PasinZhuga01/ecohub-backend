import { z } from 'zod';

import { cartItem as cartItemBaseSchema } from './facade';

export const cartItemSchema = cartItemBaseSchema.transform(({ catalog_item_id, market_id, ...object }) => ({
	...object,
	marketId: market_id,
	catalogItemId: catalog_item_id
}));

export type CartItemObject = z.output<typeof cartItemSchema>;
