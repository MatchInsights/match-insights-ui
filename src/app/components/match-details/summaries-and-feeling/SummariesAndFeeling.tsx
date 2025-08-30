import { ApiService } from "../../../services/apiService";
import MatchEvents from "./match-events/MatchEvents";
import OddsWinnerFeelingComponent from "./odds-winner-feeling/OddsWinnerFeeling";
import { RanksAndPoints } from "./ranks-and-points/RanksAndPoints";

interface SummariesAndFeelingProps {
  matchId: number;
  apiService: ApiService;
  homeTeamId: number;
  homeTeam: string;
  awayTeamId: number;
  awayTeam: string;
  leagueId: number;
}

export default function SummariesAndFeeling({
  apiService,
  homeTeamId,
  homeTeam,
  awayTeamId,
  awayTeam,
  leagueId,
  matchId,
}: SummariesAndFeelingProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
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
      <div className="flex flex-col gap-4 w-full">
        <RanksAndPoints
          homeTeamId={homeTeamId}
          awayTeamId={awayTeamId}
          leagueId={leagueId}
          apiService={apiService}
        />
        <OddsWinnerFeelingComponent
          apiService={apiService}
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          fixtureId={matchId}
        />
      </div>
    </div>
  );
}
