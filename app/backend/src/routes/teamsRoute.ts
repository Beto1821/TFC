import { Router } from 'express';
import TeamController from '../controllers/Team';

const teamRoute = Router();

teamRoute.get('/teams', TeamController.getAll);
teamRoute.get('/teams/:id', TeamController.getId);

export default teamRoute;
