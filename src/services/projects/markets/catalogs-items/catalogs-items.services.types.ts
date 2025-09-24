import { CatalogItemObject as CatalogItemBaseObject } from 'ecohub-shared/db/projects/markets';

export type CatalogItemObject = Pick<CatalogItemBaseObject, 'id' | 'name' | 'count' | 'price'>;
