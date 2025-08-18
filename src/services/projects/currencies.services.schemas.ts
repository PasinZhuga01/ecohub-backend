import { z } from 'zod';

import { currencySchema as currencyBaseSchema } from '../../models/projects/currencies.models.schemas';

export const currencySchema = currencyBaseSchema.transform(({ id, iconSrc, name, rate }) => ({ id, iconSrc, name, rate }));

export type CurrencyObject = z.output<typeof currencySchema>;
