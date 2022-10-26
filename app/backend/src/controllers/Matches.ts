import { Request, Response } from 'express';
import MatchesServices from '../services/Matches';
import TeamServices from '../services/Teams';

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

  insert = async (req: Request, res: Response) => {
    const match = req.body;
    const { homeTeam, awayTeam } = match;

    if (homeTeam === awayTeam) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const filter = await TeamServices.getById([homeTeam, awayTeam]);
    if ('statusCode' in filter) return res.status(filter.statusCode).json(filter.message);

    const final = await MatchesServices.insert(match);
    return res.status(201).json(final);
  };
}

export default new MatchesController();
