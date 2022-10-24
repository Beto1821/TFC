import { Router } from 'express';
import authent from '../middlewares/authentication';
import UserController from '../controllers/User';

const loginRoute = Router();

loginRoute.post('/login', authent);
loginRoute.get('/login/validate', UserController.getRole);

export default loginRoute;
