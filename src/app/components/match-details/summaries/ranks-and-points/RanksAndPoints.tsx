import { useEffect, useState } from "react";
import { ApiService } from "../../../../services/apiService";
import { TeamPositionsAndPoints } from "../../../../types/types";
import NoData from "../../../no-data/NoData";
import PreDisplay from "../../../pre-display/PreDisplay";

interface RanksAndPointsProps {
  homeTeamId: number;
  awayTeamId: number;
  leagueId: number;
  apiService: ApiService;
}
export const RanksAndPoints = ({
  homeTeamId,
  awayTeamId,
  leagueId,
  apiService,
}: RanksAndPointsProps) => {
  const [teamsLeagueStats, setTeamsLeagueStats] =
    useState<TeamPositionsAndPoints | null>(null);

  const [loadingScoreAndPoints, setLoadingScoreAndPoints] = useState(true);

  const fetchData = () => {
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
  };
  useEffect(() => {
    fetchData();
  }, [homeTeamId, awayTeamId, leagueId]);

  if (loadingScoreAndPoints)
    return (
      <PreDisplay
        title="Ranks And Points"
        titleClass="text-brand-orange font-semibold text-lg font-bold"
        onRefresh={fetchData}
        child={<NoData displayedMessage="Fetching ranks and points." />}
      />
    );

  if (!loadingScoreAndPoints && !teamsLeagueStats)
    return (
      <PreDisplay
        title="Ranks And Points"
        titleClass="text-brand-orange font-semibold text-lg font-bold"
        onRefresh={fetchData}
        child={<NoData displayedMessage="Failed Fetching ranks and points." />}
      />
    );

  return (
    <PreDisplay
      title="Ranks And Points"
      titleClass="text-brand-orange font-semibold text-lg font-bold"
      onRefresh={fetchData}
      child={
        <div className="flex flex-col items-left">
          <p className="text-sm text-brand-lightGray m-2">
            <span className="text-brand-yellow font-semibold m-2">
              League Points:
            </span>{" "}
            {teamsLeagueStats?.homeTeamPoints ?? "-"} vs{" "}
            {teamsLeagueStats?.awayTeamPoints ?? "-"}
          </p>
          <p className="text-sm text-brand-lightGray m-2">
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
