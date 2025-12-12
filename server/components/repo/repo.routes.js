import { Router } from 'express';
import * as controller from './repo.controller.js';

const router = Router();

router.route('/cloneRepo').post(controller.cloneRepo);

export default router;
