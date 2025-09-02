import { z } from 'zod';
import { currency as currencyBaseSchema } from 'ecohub-shared/schemas/db';

export const currencySchema = currencyBaseSchema.transform(({ project_id, icon_src, ...object }) => ({
	...object,
	projectId: project_id,
	iconSrc: icon_src
}));

export type CurrencyObject = z.output<typeof currencySchema>;
