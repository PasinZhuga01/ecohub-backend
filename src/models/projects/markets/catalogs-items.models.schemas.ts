import { z } from 'zod';
import { catalogItem as catalogItemBaseSchema } from 'ecohub-shared/schemas/db';

export const catalogItemSchema = catalogItemBaseSchema.transform(({ market_id, ...object }) => ({ ...object, marketId: market_id }));

export type CatalogItemObject = z.output<typeof catalogItemSchema>;
