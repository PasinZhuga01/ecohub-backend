import { CurrencyObject as CurrencyBaseObject } from 'ecohub-shared/db/projects';

import { pickObject } from '../../utils';

export type CurrencyObject = Pick<CurrencyBaseObject, 'id' | 'iconSrc' | 'name' | 'rate'>;

export function toCurrencyObject(object: CurrencyBaseObject): CurrencyObject {
	return pickObject(object, ['id', 'iconSrc', 'name', 'rate']);
}
