import { z } from 'zod';

import { projectSchema } from '../models/projects/index.models.schemas';
import { marketSchema } from '../models/projects/markets/index.models.schemas';

export const marketNavSchema = marketSchema.transform(({ id, name }) => ({ id, name }));
export const projectNavSchema = projectSchema.transform(({ id, name }) => ({ id, name, markets: [] as MarketNavObject[] }));

export type MarketNavObject = z.output<typeof marketNavSchema>;
export type ProjectNavObject = z.output<typeof projectNavSchema>;
