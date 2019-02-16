import {Router} from 'express';

import * as controller from './controllers/user.controller';

const router = new Router();

router.post('/signup', controller.signUp);
router.post('/login', controller.login);

export default router;