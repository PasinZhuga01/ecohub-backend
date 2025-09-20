import { z } from 'zod';
import { projectSchema as projectBaseSchema } from 'ecohub-shared/db';

export const projectSchema = projectBaseSchema.transform(({ user_id, interacted_at, ...object }) => ({
	...object,
	userId: user_id,
	interactedAt: interacted_at
}));

export type ProjectObject = z.output<typeof projectSchema>;
