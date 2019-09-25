import { Router } from 'express';

import UserController from './app/controllers/UserController';
import AuthMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);

routes.use(AuthMiddleware);

routes.put('/users', UserController.update);
routes.get('/users', UserController.show);

export default routes;
