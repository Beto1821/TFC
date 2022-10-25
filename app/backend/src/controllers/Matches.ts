import { Request, Response } from 'express';
import MatchesServices from '../services/Matches';

class MatchesController {
  getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress) {
      const findAll = (
        await MatchesServices.getAll({ where: { inProgress: inProgress === 'true' } })
      );
      return res.status(200).json(findAll);
    }
    const matches = await MatchesServices.getAll();
    return res.status(200).json(matches);
  };
}

export default new MatchesController();
