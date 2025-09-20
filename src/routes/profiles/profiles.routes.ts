import { profilesApi } from 'ecohub-shared/http/api';
import { createRequestSchemaValidator, verifySessionToken } from '@middlewares';
import { Profiles as Controllers } from '@controllers';

import { createRouter } from '../utils';

export default createRouter(profilesApi, {
	'/auth': (body) => [createRequestSchemaValidator(body), Controllers.auth],
	'/get': () => [verifySessionToken, Controllers.get]
});
