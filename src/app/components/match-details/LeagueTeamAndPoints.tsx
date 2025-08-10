import { useEffect, useState } from "react";
import { ApiService } from "../../services/apiService";
import { TeamPositionsAndPoints } from "../../types/types";
import FetchStatus from "../fetch-status/FetchStatus";
import PreDisplay from "../pre-display/PreDisplay";

interface LeagueTeamAndPointsProps {
  homeTeamId: number;
  awayTeamId: number;
  leagueId: number;
  apiService: ApiService;
}
export const LeagueTeamAndPoints = ({
  homeTeamId,
  awayTeamId,
  leagueId,
  apiService,
}: LeagueTeamAndPointsProps) => {
  const [teamsLeagueStats, setTeamsLeagueStats] =
    useState<TeamPositionsAndPoints | null>(null);

  const [loadingScoreAndPoints, setLoadingScoreAndPoints] = useState(true);
  const [showScoreAndPoints, setShowScoreAndPoints] = useState(false);

  useEffect(() => {
    setLoadingScoreAndPoints(false);
    setTeamsLeagueStats(null);
    apiService
      .fetchTeamLeagueStats(homeTeamId, awayTeamId, leagueId)
      .then((details) => {
        setTeamsLeagueStats(details);
        setLoadingScoreAndPoints(false);
      })
      .catch(() => {
        setLoadingScoreAndPoints(false);
        setTeamsLeagueStats(null);
      });
  }, [homeTeamId, awayTeamId, leagueId, showScoreAndPoints]);

  if (loadingScoreAndPoints && showScoreAndPoints)
    return <FetchStatus type="loading" message="Loading League Stats..." />;

  if (!loadingScoreAndPoints && showScoreAndPoints && !teamsLeagueStats)
    return <FetchStatus type="error" message="Failed to load League Stats." />;

  return (
    <PreDisplay
      title="Ranks And Points"
      expanded={showScoreAndPoints}
      setExpanded={setShowScoreAndPoints}
      child={
        <div className="space-y-1 text-left">
          <p className="text-base text-brand-lightGray">
            <span className="text-brand-yellow font-semibold">
              League Points:
            </span>{" "}
            {teamsLeagueStats?.homeTeamPoints ?? "-"} vs{" "}
            {teamsLeagueStats?.awayTeamPoints ?? "-"}
          </p>
          <p className="text-base text-brand-lightGray">
            <span className="text-brand-yellow font-semibold">
              League Ranks:
            </span>{" "}
            {teamsLeagueStats?.homeTeamPosition ?? "-"} vs{" "}
            {teamsLeagueStats?.awayTeamPosition ?? "-"}
          </p>
        </div>
      }
    />
  );
};
