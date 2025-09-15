import { RequestHandler, Request, Response, Router, NextFunction } from 'express';
import { BaseApi, Method } from 'ecohub-shared/schemas/api';

type RoutesHandlersCreators<T extends BaseApi> = {
	[K in keyof T['endpoints']]: (
		body: T['endpoints'][K]['request'],
		raw: RoutesHandlersCreatorRaw<T, K>
	) => ((req: Request<any, any, any, any, any>, res: Response<any, any>, next: NextFunction) => unknown)[];
};

type RoutesHandlersCreatorRaw<T extends BaseApi, K extends keyof T['endpoints']> = T['endpoints'][K] extends { rawRequest: infer R }
	? R
	: null;

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

export function createRouter<T extends BaseApi>(apiSchema: T, creators: RoutesHandlersCreators<T>): Router {
	const router = Router();

	for (const path in creators) {
		const endpoint = apiSchema.endpoints[path]!;
		const { method, request } = endpoint;
		const { rawRequest } = 'rawRequest' in endpoint ? endpoint : { rawRequest: null };

		registerRoute(router, path, method, creators[path](request, rawRequest as RoutesHandlersCreatorRaw<T, typeof path>));
	}

	return router;
}
