import { z } from 'zod';

import { marketSchema as marketBaseSchema } from '../../../models/projects/markets/index.models.schemas';

export const marketNavSchema = marketBaseSchema.transform(({ id, name }) => ({ id, name }));
export const marketPageSchema = marketBaseSchema.transform(({ id, name, interactedAt }) => ({ id, name, interactedAt }));

export type MarketNavObject = z.output<typeof marketNavSchema>;
export type MarketPageObject = z.output<typeof marketPageSchema>;
