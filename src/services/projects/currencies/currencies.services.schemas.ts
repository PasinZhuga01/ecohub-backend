import { CurrenciesSchemas as Schemas } from '@models';

import { pickObject } from '../../utils';

export type CurrencyObject = Pick<Schemas.CurrencyObject, 'id' | 'iconSrc' | 'name' | 'rate'>;

export function toCurrencyObject(object: Schemas.CurrencyObject): CurrencyObject {
	return pickObject(object, ['id', 'iconSrc', 'name', 'rate']);
}
