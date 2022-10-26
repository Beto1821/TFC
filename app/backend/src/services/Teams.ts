import Teams from '../database/models/teams';
// import ITeam from '../interfaces/ITeam';

class TeamsService {
  getById = async (ids: number[]) => {
    const teams = await Promise.all(ids.map((id) => Teams.findOne({ where: { id } })));

    const invalidTeam = teams.some((team) => !team);

    if (invalidTeam) {
      return { statusCode: 404, message: 'There is no team with such id!' };
    }

    return teams;
  };
}

export default new TeamsService();
