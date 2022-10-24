import { Router } from 'express';
import authent from '../middlewares/authentication';
import UserController from '../controllers/User';

const loginRoute = Router();
const usercontroller = new UserController();

loginRoute.post('/login', authent);
loginRoute.get('/login/validate', usercontroller.getRole);

export default loginRoute;
