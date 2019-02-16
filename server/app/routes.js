import UserRouter from './api/user/index';
import TaskRouter from './api/task/index';


exports.default = app => {
  app.use('/api/users', UserRouter);
  app.use('/api/tasks', TaskRouter)
};