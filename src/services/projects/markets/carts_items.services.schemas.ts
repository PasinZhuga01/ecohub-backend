import { z } from 'zod';

import { cartItemSchema as cartItemBaseSchema } from '../../../models/projects/markets/carts_items.models.schemas';

export const cartItemSchema = cartItemBaseSchema.transform(({ id, catalogItemId, count }) => ({ id, catalogItemId, count }));

export type CartItemObject = z.output<typeof cartItemSchema>;
