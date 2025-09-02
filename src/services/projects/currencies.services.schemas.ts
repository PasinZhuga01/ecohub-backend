import { pickObject } from '../utils';
import { CurrencyObject as CurrencyBaseObject } from '../../models/projects/currencies.models.schemas';

export type CurrencyObject = Pick<CurrencyBaseObject, 'id' | 'iconSrc' | 'name' | 'rate'>;

export function toCurrencyObject(object: CurrencyBaseObject): CurrencyObject {
	return pickObject(object, ['id', 'iconSrc', 'name', 'rate']);
}
