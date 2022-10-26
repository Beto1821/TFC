import { Router } from 'express';
import MatchesController from '../controllers/Matches';
import Auth from '../middlewares/authentication';

const matchesRoute = Router();

matchesRoute.get('/matches', MatchesController.getAll);
matchesRoute.post('/matches', Auth.jwtValidate, MatchesController.insert);
matchesRoute.patch('/matches/:id/finish', MatchesController.finish);
matchesRoute.patch('/matches/:id', MatchesController.update);

export default matchesRoute;
