import { Router } from 'express';
import auth from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// apenas as rotas declaras após a aplicação do middleware de auth serão validadas
routes.use(auth);
routes.put('/users', UserController.update);

export default routes;
