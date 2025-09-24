import { createRootRouter } from './utils';
import profilesRouter from './profiles/profiles.routes';
import projectsRouter from './projects/projects/projects.routes';
import currenciesRouter from './projects/currencies/currencies.routes';
import marketsRouter from './projects/markets/markets/markets.routes';
import catalogsItemsRouter from './projects/markets/catalogs-items/catalogs-items.routes';
import cartsItemsRouter from './projects/markets/carts-items/carts-items.routes';

export default createRootRouter(profilesRouter, projectsRouter, currenciesRouter, marketsRouter, catalogsItemsRouter, cartsItemsRouter);
