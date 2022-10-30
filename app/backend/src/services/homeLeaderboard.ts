import {
  calculatePoints,
  calculateVictories,
  calculateLosses,
  calculateDraw,
  calcularGolsFavor,
  calcularGolsContra,
  calculateTotalScore,
  calculateVictoriesPercentage,
} from '../middlewares/homeLeaderboard';

import TeamsService from './Teams';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';
import IHomeMatch from '../interfaces/IHomeMatch';

class HomeLeaderboard {
  getAllHomeTeamMatches = async () => {
    const result = await Matches.findAll({
      where: {
        inProgress: false,
      },
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: {
            exclude: ['id'],
          },
        },
      ],
    });
    return result as unknown as IHomeMatch[];
  };

  leaderboardHome = async () => {
    const homeTeams = await TeamsService.getALLTeams();
    const homeTeamMatches = await this.getAllHomeTeamMatches();
    const matchMap = homeTeams.map((e) => {
      const home = homeTeamMatches.filter((match) => match.teamHome.teamName === e.teamName);
      return {
        name: e.teamName,
        totalPoints: calculatePoints(home),
        totalGames: home.length,
        totalVictories: calculateVictories(home),
        totalDraws: calculateDraw(home),
        totalLosses: calculateLosses(home),
        goalsFavor: calcularGolsFavor(home),
        goalsOwn: calcularGolsContra(home),
        goalsBalance: calculateTotalScore(home),
        efficiency: calculateVictoriesPercentage(home),
      };
    });
    return matchMap;
  };

  sortLeaderboardHome = async () => {
    const leader = await this.leaderboardHome();
    const result = leader.sort(
      (a, b) =>
        b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn,
    );
    return result;
  };
}

export default new HomeLeaderboard();
