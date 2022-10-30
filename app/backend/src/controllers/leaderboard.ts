import { Request, Response } from 'express';
import { sortLeaderboardHome } from '../services/homeLeaderboard';
import { sortLeaderboardAway } from '../services/awayLeaderboard';
import { sortLeaderboard } from '../services/leaderboard';

class LeaderboardController {
  home = async (req: Request, res: Response) => {
    const ranking = await sortLeaderboardHome();

    if (!ranking) return res.status(404).json();

    return res.status(200).json(ranking);
  };

  away = async (req: Request, res: Response) => {
    const ranking = await sortLeaderboardAway();

    if (!ranking) return res.status(404).json();

    return res.status(200).json(ranking);
  };

  getAll = async (req: Request, res: Response) => {
    const ranking = await sortLeaderboard();

    if (!ranking) return res.status(404).json();

    return res.status(200).json(ranking);
  };
}

export default new LeaderboardController();
