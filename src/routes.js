import { Router } from 'express';

// controllers
import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import NoteController from './app/controllers/NoteController';
import BatchNoteController from './app/controllers/BatchNoteController';

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

// Batch Notes operations
routes.delete('/notes_batch/delete_many', BatchNoteController.deleteMany);
routes.post('/notes_batch/recover_all', BatchNoteController.recoverAll);
routes.post('/notes_batch/recover_many', BatchNoteController.recoverMany);
routes.delete(
  '/notes_batch/delete_definitely_all',
  BatchNoteController.deleteDefinitelyAll
);
routes.delete(
  '/notes_batch/delete_definitely_many',
  BatchNoteController.deleteDefinitelyMany
);

export default routes;
