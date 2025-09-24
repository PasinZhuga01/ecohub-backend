import { CurrencyObject as CurrencyBaseObject } from 'ecohub-shared/db/projects';

export type CurrencyObject = Pick<CurrencyBaseObject, 'id' | 'iconSrc' | 'name' | 'rate'>;
