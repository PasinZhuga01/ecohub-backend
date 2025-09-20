import { z } from 'zod';
import { currencySchema as currencyBaseSchema } from 'ecohub-shared/db';

export const currencySchema = currencyBaseSchema.transform(({ project_id, icon_src, ...object }) => ({
	...object,
	projectId: project_id,
	iconSrc: icon_src
}));

export type CurrencyObject = z.output<typeof currencySchema>;
