import { useEffect, useState } from "react";
import { ApiService } from "../../../../services/apiService";
import { TeamPositionsAndPoints } from "../../../../types/league-types";
import NoData from "../../../no-data/NoData";
import PreDisplay from "../../../pre-display/PreDisplay";

interface RanksAndPointsProps {
  homeTeam: string;
  awayTeam: string;
  homeTeamId: number;
  awayTeamId: number;
  leagueId: number;
  apiService: ApiService;
}
export const RanksAndPoints = ({
  homeTeam,
  awayTeam,
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
        <div className="container flex w-full">
          <ul className="flex flex-col">
            <li className="flex flex-col mb-2">
              <div className="select-none cursor-pointer rounded-md flex flex-col transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                <div className="flex mb-4 flex-wrap">
                  <div className="flex flex-wrap items-center justify-center rounded-md w-8 h-8 bg-brand-royalblue">
                    ⚽️
                  </div>
                  <span
                    data-testid="home-label"
                    className="text-sm m-2 text-brand-orange"
                  >
                    {homeTeam}
                  </span>
                </div>
                <div className="flex flex-row">
                  <div className="font-medium flex flex-row flex-wrap gap-4 text-xs text-white">
                    {teamsLeagueStats?.awayTeam.length === 0 ? (
                      <span className="text-sm text-gray-400">
                        No data available
                      </span>
                    ) : (
                      teamsLeagueStats?.awayTeam.map((result, idx) => (
                        <div
                          data-testid="home-data"
                          key={idx}
                          className="flex flex-row gap-2 items-center bg-brand-card px-2 py-1 rounded-lg"
                        >
                          <span className="font-semibold">
                            {result.description}
                          </span>
                          <span>Pos: {result.position}</span>
                          <span>Pts: {result.points}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </li>
            <li className="flex flex-col mt-2 mb-2">
              <div className="select-none cursor-pointer rounded-md flex flex-col transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                <div className="flex mb-4 flex-wrap">
                  <div className="flex flex-wrap items-center justify-center rounded-md w-8 h-8 bg-brand-royalblue">
                    ⚽️
                  </div>
                  <span
                    data-testid="away-label"
                    className="text-sm m-2 text-brand-orange"
                  >
                    {awayTeam}
                  </span>
                </div>
                <div className="flex flex-row">
                  <div className="font-medium flex flex-row flex-wrap gap-4 text-xs text-white">
                    {teamsLeagueStats?.awayTeam.length === 0 ? (
                      <span className="text-sm text-gray-400">
                        No data available
                      </span>
                    ) : (
                      teamsLeagueStats?.awayTeam.map((result, idx) => (
                        <div
                          data-testid="away-data"
                          key={idx}
                          className="flex flex-row gap-2 items-center bg-brand-card px-2 py-1 rounded-lg"
                        >
                          <span className="font-semibold">
                            {result.description}
                          </span>
                          <span>Pos: {result.position}</span>
                          <span>Pts: {result.points}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      }
    />
  );
};
