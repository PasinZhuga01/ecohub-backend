import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

import { ErrorPayload } from '../types/http';

export type Request<B extends object> = ExpressRequest<{}, {}, B>;
export type Response<B extends object> = ExpressResponse<B | ErrorPayload>;
