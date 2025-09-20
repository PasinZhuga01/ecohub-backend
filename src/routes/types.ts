import { Request, Response, NextFunction, Router } from 'express';
import { BaseApi } from 'ecohub-shared/http/api';

export type RoutesHandlersCreators<T extends BaseApi> = {
	[K in keyof T['endpoints']]: (
		body: T['endpoints'][K]['request'],
		raw: RoutesHandlersCreatorRaw<T, K>
	) => ((req: Request<any, any, any, any, any>, res: Response<any, any>, next: NextFunction) => unknown)[];
};

export type RoutesHandlersCreatorRaw<T extends BaseApi, K extends keyof T['endpoints']> = T['endpoints'][K] extends { rawRequest: infer R }
	? R
	: null;

export type RouterWithPath<T extends BaseApi> = { path: T['basePath']; router: Router };
