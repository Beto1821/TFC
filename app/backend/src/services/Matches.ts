import Matches from '../database/models/matches';
import Teams from '../database/models/teams';
import IGoals from '../interfaces/IGoals';

type IItem<T> = {
  [key: string]: T;
};

class MatchesService {
  getAll = async <T>(item?: IItem<T>) => {
    const matches = await Matches.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
      ...item,
    });
    console.log(matches);
    return matches;
  };

  insert = async (match: Matches) => {
    const verify = await Matches.create({ ...match, inProgress: true });
    return verify;
  };

  finish = async (id: string) => {
    await Matches.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  };

  update = async (id: number, goals: IGoals) => {
    const { homeTeamGoals, awayTeamGoals } = goals;

    await Matches.update({ awayTeamGoals, homeTeamGoals }, { where: { id } });

    const updated = await Matches.findOne({
      where: { id },
    });

    return updated;
  };
}

export default new MatchesService();
