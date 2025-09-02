import { Router } from 'express';
import { Profiles as Schemas } from 'ecohub-shared/schemas/requests';
import { createRequestSchemaValidator, verifySessionToken as verifySessionTokenMiddleware } from '@middlewares/index';
import { auth as authController, get as getController } from '@controllers/profiles.controllers';

const router = Router();

router.post('/auth', createRequestSchemaValidator(Schemas.auth), authController);
router.get('/get', verifySessionTokenMiddleware, getController);

export default router;
