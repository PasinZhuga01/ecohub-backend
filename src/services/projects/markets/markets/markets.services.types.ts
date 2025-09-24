import { MarketObject } from 'ecohub-shared/db/projects/markets';

export type MarketNavObject = Pick<MarketObject, 'id' | 'name'>;
export type MarketPageObject = Pick<MarketObject, 'id' | 'name'> & { interactedAt: string };
