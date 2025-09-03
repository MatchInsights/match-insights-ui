import { ApiService } from "../../../services/apiService";
import MatchEvents from "./match-events/MatchEvents";
import { RanksAndPoints } from "./ranks-and-points/RanksAndPoints";

interface SummariesAndFeelingProps {
  apiService: ApiService;
  homeTeamId: number;
  homeTeam: string;
  awayTeamId: number;
  awayTeam: string;
  leagueId: number;
}

export default function MatchSummaries({
  apiService,
  homeTeamId,
  homeTeam,
  awayTeamId,
  awayTeam,
  leagueId,
}: SummariesAndFeelingProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <MatchEvents
        title={`${homeTeam} Last Five Matches Summary`}
        teamId={homeTeamId}
        apiService={apiService}
      />

      <MatchEvents
        title={`${awayTeam} Last Five Matches Summary`}
        teamId={awayTeamId}
        apiService={apiService}
      />

      <RanksAndPoints
        homeTeamId={homeTeamId}
        awayTeamId={awayTeamId}
        leagueId={leagueId}
        apiService={apiService}
      />
    </div>
  );
}
