import { z } from 'zod';

import { market as marketBaseSchema } from './facade';

export const marketSchema = marketBaseSchema.transform(({ project_id, interacted_at, ...object }) => ({
	...object,
	projectId: project_id,
	interactedAt: interacted_at
}));

export type MarketObject = z.output<typeof marketSchema>;
