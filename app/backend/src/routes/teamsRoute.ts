import { Router } from 'express';
import TeamController from '../controllers/Team';

const teamRoute = Router();

teamRoute.get('/teams', TeamController.getAll);

export default teamRoute;
