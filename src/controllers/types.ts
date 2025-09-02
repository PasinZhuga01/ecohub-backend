import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { ErrorPayload } from 'ecohub-shared/types/http';

export type Request<B extends object> = ExpressRequest<object, object, B>;

export type Response<B extends object, L extends object = object> = ExpressResponse<B | ErrorPayload, L>;
export type ResponseWithSession<B extends object> = Response<B, { userId: number }>;
