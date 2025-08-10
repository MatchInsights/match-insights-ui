import { useEffect, useState } from "react";
import { ApiService } from "../../../services/apiService";
import { TeamPositionsAndPoints } from "../../../types/types";
import FetchStatus from "../../fetch-status/FetchStatus";
import PreDisplay from "../../pre-display/PreDisplay";

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
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (isShown) {
      setLoadingScoreAndPoints(true);
      apiService
        .fetchTeamLeagueStats(homeTeamId, awayTeamId, leagueId)
        .then((details: TeamPositionsAndPoints) => {
          setTeamsLeagueStats(details);
        })
        .catch(() => {
          setTeamsLeagueStats(null);
        })
        .finally(() => setLoadingScoreAndPoints(false));
    }
  }, [homeTeamId, awayTeamId, leagueId, isShown]);

  if (loadingScoreAndPoints && isShown)
    return (
      <PreDisplay
        title="Ranks And Points"
        expanded={isShown}
        setExpanded={setIsShown}
        child={<FetchStatus type="loading" message="Loading League Stats..." />}
      />
    );

  if (!loadingScoreAndPoints && isShown && !teamsLeagueStats)
    return (
      <PreDisplay
        title="Ranks And Points"
        expanded={isShown}
        setExpanded={setIsShown}
        child={
          <FetchStatus type="info" message="Failed to load League Stats." />
        }
      />
    );

  return (
    <PreDisplay
      title="Ranks And Points"
      expanded={isShown}
      setExpanded={setIsShown}
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
