import { Router } from 'express';

import { Profiles as Schemas } from './facade';

import { createRequestSchemaValidator, verifySessionToken as verifySessionTokenMiddleware } from '../middlewares';
import { auth as authController, get as getController } from '../controllers/profiles.controllers';

const router = Router();

router.post('/auth', createRequestSchemaValidator(Schemas.auth), authController);
router.get('/get', verifySessionTokenMiddleware, getController);

export default router;
