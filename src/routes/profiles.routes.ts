import { Router } from 'express';

import { Profiles as Schemas } from './facade';

import { createRequestBodySchemaValidator, verifySessionToken as verifySessionTokenMiddleware } from '../middlewares';
import { auth as authController, get as getController } from '../controllers/profiles.controllers';

const router = Router();

router.post('/auth', createRequestBodySchemaValidator(Schemas.auth), authController);
router.get('/get', verifySessionTokenMiddleware, getController);

export default router;
