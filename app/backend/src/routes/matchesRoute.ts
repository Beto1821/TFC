import { Router } from 'express';
import MatchesController from '../controllers/Matches';

const matchesRoute = Router();

matchesRoute.get('/matches', MatchesController.getAll);

export default matchesRoute;
