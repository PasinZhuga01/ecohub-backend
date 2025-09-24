import { ProjectObject } from 'ecohub-shared/db/projects';

import { MarketNavObject } from '../markets/markets/markets.services.types';

export type ProjectNavObject = Pick<ProjectObject, 'id' | 'name'> & { markets: MarketNavObject[] };
export type ProjectPageObject = Pick<ProjectObject, 'id' | 'name'> & { interactedAt: string };
