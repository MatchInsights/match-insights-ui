import { ApiService } from "../../../services/apiService";
import OddsWinnerFeelingComponent from "./odds-winner-feeling/OddsWinnerFeeling";
import LastFiveMatches from "./last-five-matches/LastFiveMatches";
import TeamsRestStatusComponent from "./teams-rest-status/TeamRestStatus";
import TeamsScorePerformanceComponent from "./teams-score-performance/TeamsScorePerformance";

interface QuickInfoProps {
  apiService: ApiService;
  homeTeamId: number;
  homeTeam: string;
  awayTeamId: number;
  awayTeam: string;
  leagueId: number;
  fixtureDate: string;
  matchId: number;
}

export default function QuickInfo({
  apiService,
  homeTeamId,
  homeTeam,
  awayTeamId,
  awayTeam,
  leagueId,
  fixtureDate,
  matchId,
}: QuickInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <LastFiveMatches
        apiService={apiService}
        homeTeam={homeTeam}
        homeTeamId={homeTeamId}
        awayTeam={awayTeam}
        awayTeamId={awayTeamId}
      />
      <TeamsScorePerformanceComponent
        apiService={apiService}
        homeTeam={homeTeam}
        homeTeamId={homeTeamId}
        awayTeam={awayTeam}
        awayTeamId={awayTeamId}
        leagueId={leagueId}
      />
      <TeamsRestStatusComponent
        apiService={apiService}
        homeTeam={homeTeam}
        homeTeamId={homeTeamId}
        awayTeam={awayTeam}
        awayTeamId={awayTeamId}
        fixtureDate={fixtureDate}
      />
      <OddsWinnerFeelingComponent
        apiService={apiService}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        fixtureId={matchId}
      />
    </div>
  );
}
