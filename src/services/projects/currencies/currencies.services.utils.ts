import { CurrencyObject as CurrencyBaseObject } from 'ecohub-shared/db/projects';

import { CurrencyObject } from './currencies.services.types';

import { pickObject } from '../../utils';

export function toCurrencyObject(object: CurrencyBaseObject): CurrencyObject {
	return pickObject(object, ['id', 'iconSrc', 'name', 'rate']);
}
