import { useEffect, useState } from "react";
import { ApiService } from "../../../services/apiService";
import { TeamPositionsAndPoints } from "../../../types/types";
import NoData from "../../no-data/NoData";
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
        titleClass="text-brand-orange  font-semibold flex-grow text-2xl font-bold"
        child={<NoData />}
      />
    );

  if (!loadingScoreAndPoints && isShown && !teamsLeagueStats)
    return (
      <PreDisplay
        title="Ranks And Points"
        titleClass="text-brand-orange  font-semibold flex-grow text-2xl font-bold"
        expanded={isShown}
        setExpanded={setIsShown}
        child={<NoData />}
      />
    );

  return (
    <PreDisplay
      title="Ranks And Points"
      expanded={isShown}
      titleClass="text-brand-orange  font-semibold flex-grow text-2xl font-bold"
      setExpanded={setIsShown}
      child={
        <div className="space-y-1 text-left">
          <p className="text-base text-brand-lightGray m-2">
            <span className="text-brand-yellow font-semibold m-2">
              League Points:
            </span>{" "}
            {teamsLeagueStats?.homeTeamPoints ?? "-"} vs{" "}
            {teamsLeagueStats?.awayTeamPoints ?? "-"}
          </p>
          <p className="text-base text-brand-lightGray m-2">
            <span className="text-brand-yellow font-semibold m-2 ">
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
