import { Router } from 'express';
import leadboardController from '../controllers/leaderboard';

const leaderBoardRoute = Router();

leaderBoardRoute.get('/leaderboard/home', leadboardController.home);
leaderBoardRoute.get('/leaderboard/away', leadboardController.away);
leaderBoardRoute.get('/leaderboard/', leadboardController.getAll);

export default leaderBoardRoute;
