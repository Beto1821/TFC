export default interface IAwayMatch {
  teamName: string;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress?: boolean;
  teamAway: {
    teamName: string;
  };
}
