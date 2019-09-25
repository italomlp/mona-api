import { Router } from 'express';

// controllers
import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import NoteController from './app/controllers/NoteController';

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

// Notes CRUD
routes.post('/notes', NoteController.store);
routes.get('/notes', NoteController.index);
routes.put('/notes/:id', NoteController.update);
routes.delete('/notes/:id', NoteController.delete);
routes.get('/notes/:id', NoteController.show);

export default routes;
