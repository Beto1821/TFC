import { Request, Response } from 'express';
import teamModel from '../database/models/teams';

class TeamsController {
  getAll = async (_req: Request, res: Response) => {
    const teams = await teamModel.findAll();
    return res.status(200).json(teams);
  };

  getId = async (req: Request, res: Response) => {
    const idTeam = await teamModel.findOne({ where: { id: req.params.id } });
    return res.status(200).json(idTeam);
  };
}

export default new TeamsController();
