import Matches from '../database/models/matches';
import Teams from '../database/models/teams';
// import IGoals from '../interfaces/IGoals';

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
    return matches;
  };
}

export default new MatchesService();
