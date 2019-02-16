import {Router} from 'express';

import * as controller from './controllers/task.controller';
import {auth} from '../../helpers/middlewares/auth.middleware';
import {upload} from "../../helpers/file.helper";

const router = new Router();

router.get('/', auth, controller.getAllTasks);
router.get('/:id', auth, controller.getTaskById);
router.post('/task', auth, upload.single('form-file'), controller.addTask);
router.delete('/:id', auth, controller.deleteById);
router.get('/:id/download', auth, controller.download);
router.post('/:id/status', auth, controller.updateStatus);
router.post('/:id/update', auth, upload.single('form-file'), controller.update);

export default router;