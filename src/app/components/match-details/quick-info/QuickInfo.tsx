import { ApiService } from "../../../services/apiService";
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
}

export default function QuickInfo({
  apiService,
  homeTeamId,
  homeTeam,
  awayTeamId,
  awayTeam,
  leagueId,
  fixtureDate,
}: QuickInfoProps) {
  return (
    <div className="flex flex-col md:flex-row gap-2 w-full">
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
    </div>
  );
}
