import { z } from 'zod';
import { catalogItemSchema as catalogItemBaseSchema } from 'ecohub-shared/db';

export const catalogItemSchema = catalogItemBaseSchema.transform(({ market_id, ...object }) => ({ ...object, marketId: market_id }));

export type CatalogItemObject = z.output<typeof catalogItemSchema>;
