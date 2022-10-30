import { Request, Response } from 'express';
import HomeLeaderboard from '../services/homeLeaderboard';
import AwayLeaderboard from '../services/awayLeaderboard';
import Leaderboard from '../services/leaderboard';

class LeaderboardController {
  home = async (req: Request, res: Response) => {
    const ranking = await HomeLeaderboard.sortLeaderboardHome();

    if (!ranking) return res.status(404).json();

    return res.status(200).json(ranking);
  };

  away = async (req: Request, res: Response) => {
    const ranking = await AwayLeaderboard.sortLeaderboardAway();

    if (!ranking) return res.status(404).json();

    return res.status(200).json(ranking);
  };

  getAll = async (req: Request, res: Response) => {
    const ranking = await Leaderboard.sortLeaderboard();

    if (!ranking) return res.status(404).json();

    return res.status(200).json(ranking);
  };
}

export default new LeaderboardController();
