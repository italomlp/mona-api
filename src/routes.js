import { Router } from 'express';

// controllers
import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';

// middlewares
import AuthMiddleware from './app/middlewares/auth';

// routes
const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/auth', AuthController.store);

// routes with required authentication
routes.use(AuthMiddleware);

routes.put('/users', UserController.update);
routes.get('/users', UserController.show);

export default routes;
