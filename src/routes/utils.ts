import { RequestHandler, Router } from 'express';
import { BaseApi, Method } from 'ecohub-shared/http/api';

import { RouterWithPath, RoutesHandlersCreatorRaw, RoutesHandlersCreators } from './types';

function registerRoute(router: Router, path: string, method: Method, handlers: RequestHandler[]) {
	switch (method) {
		case 'GET':
			return router.get(path, ...handlers);
		case 'POST':
			return router.post(path, ...handlers);
		case 'PATCH':
			return router.patch(path, ...handlers);
		case 'DELETE':
			return router.delete(path, ...handlers);
	}
}

export function createRouter<T extends BaseApi>(api: T, creators: RoutesHandlersCreators<T>): RouterWithPath<T> {
	const router = Router();

	for (const path in creators) {
		const endpoint = api.endpoints[path]!;
		const { method, request } = endpoint;
		const { rawRequest } = 'rawRequest' in endpoint ? endpoint : { rawRequest: null };

		registerRoute(router, path, method, creators[path](request, rawRequest as RoutesHandlersCreatorRaw<T, typeof path>));
	}

	return { path: api.basePath, router };
}

export function createRootRouter(...routers: RouterWithPath<BaseApi>[]): Router {
	const rootRouter = Router();

	for (const router of routers) {
		rootRouter.use(router.path, router.router);
	}

	return rootRouter;
}
