import Router from 'express';

import profilesRouter from './profiles.routes';
import projectsRouters from './projects';

const router = Router();

router.use('/profiles', profilesRouter);
router.use('/projects', projectsRouters);

export default router;
