import { z } from 'zod';

import { MarketNavObject } from './markets/index.services.schemas';

import { projectSchema as projectBaseSchema } from '../../models/projects/index.models.schemas';

export const projectNavSchema = projectBaseSchema.transform(({ id, name }) => ({ id, name, markets: [] as MarketNavObject[] }));
export const projectPageSchema = projectBaseSchema.transform(({ id, name, interactedAt }) => ({ id, name, interactedAt }));

export type ProjectNavObject = z.output<typeof projectNavSchema>;
export type ProjectPageObject = z.output<typeof projectPageSchema>;
