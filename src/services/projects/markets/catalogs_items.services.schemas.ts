import { z } from 'zod';

import { catalogItemSchema as catalogItemBaseSchema } from '../../../models/projects/markets/catalogs_items.models.schemas';

export const catalogItemSchema = catalogItemBaseSchema.transform(({ id, name, count, price }) => ({ id, name, count, price }));

export type CatalogItemObject = z.output<typeof catalogItemSchema>;
