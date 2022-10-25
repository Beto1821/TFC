import { Router } from 'express';
import MatchesController from '../controllers/Matches';

const matchesRoute = Router();

matchesRoute.get('/matches', MatchesController.getAll);
// matchesRoute.get('/teams/:id/finish', MatchesController.getIdFinish);
// matchesRoute.get('/teams/:id', MatchesController.getId);

export default matchesRoute;
