import {
  calculatePoints,
  calculateVictories,
  calculateLosses,
  calculateDraw,
  calcularGolsFavor,
  calcularGolsContra,
  calculateTotalScore,
  calculateVictoriesPercentage,
} from '../middlewares/awayLeaderboard';

import TeamsService from './Teams';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';
import IAwayMatch from '../interfaces/IAwayMatch';
import ILeaderboardScore from '../interfaces/ILeaderboardScore';

class AwayLeaderboard {
  getAllAwayTeamMatches = async () => {
    const result = await Matches.findAll({
      where: {
        inProgress: false,
      },
      include: [
        {
          model: Teams,
          as: 'teamAway',
          attributes: {
            exclude: ['id'],
          },
        },
      ],
    });
    return result as unknown as IAwayMatch[];
  };

  leaderboardAway = async () => {
    const awayTeams = await TeamsService.getALLTeams();
    const awayTeamMatches = await this.getAllAwayTeamMatches();
    const matchMap = awayTeams.map((e: { teamName: string; }) => {
      const away = awayTeamMatches.filter((match) => match.teamAway.teamName === e.teamName);
      return {
        name: e.teamName,
        totalPoints: calculatePoints(away),
        totalGames: away.length,
        totalVictories: calculateVictories(away),
        totalDraws: calculateDraw(away),
        totalLosses: calculateLosses(away),
        goalsFavor: calcularGolsFavor(away),
        goalsOwn: calcularGolsContra(away),
        goalsBalance: calculateTotalScore(away),
        efficiency: calculateVictoriesPercentage(away),
      };
    });
    return matchMap;
  };

  sortLeaderboardAway = async () => {
    const leader = await this.leaderboardAway();
    const result = leader.sort(
      (
        a: ILeaderboardScore,
        b: ILeaderboardScore,
      ) =>
        b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn,
    );
    return result;
  };
}

export default new AwayLeaderboard();
