import { profilesApi } from 'ecohub-shared/schemas/api';
import { createRequestSchemaValidator, verifySessionToken } from '@middlewares/index';
import { auth as authController, get as getController } from '@controllers/profiles.controllers';
import { createRouter } from '@routes/router';

export default createRouter(profilesApi, {
	'/auth': (body) => [createRequestSchemaValidator(body), authController],
	'/get': () => [verifySessionToken, getController]
});
