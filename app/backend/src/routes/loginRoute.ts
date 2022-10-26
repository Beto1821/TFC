import { Router } from 'express';
import authent from '../middlewares/authentication';
import UserController from '../controllers/User';

const loginRoute = Router();

loginRoute.post('/login', authent.authenticate);
loginRoute.get('/login/validate', UserController.getRole);

export default loginRoute;
