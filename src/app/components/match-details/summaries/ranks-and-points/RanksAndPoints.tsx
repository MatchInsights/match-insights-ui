import { useEffect, useState } from "react";
import { ApiService } from "../../../../services/apiService";
import {
  TeamPositionsAndPoints,
  PositionAndPoints,
} from "../../../../types/league-types";
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
      .catch(() => setTeamsLeagueStats(null))
      .finally(() => setLoadingScoreAndPoints(false));
  };

  useEffect(() => {
    fetchData();
  }, [homeTeamId, awayTeamId, leagueId]);

  if (loadingScoreAndPoints)
    return (
      <PreDisplay
        title="Ranks And Points"
        titleClass="text-brand-yellow font-semibold text-lg font-bold"
        onRefresh={fetchData}
        child={<NoData displayedMessage="Fetching ranks and points." />}
      />
    );

  if (!loadingScoreAndPoints && !teamsLeagueStats)
    return (
      <PreDisplay
        title="Ranks And Points"
        titleClass="text-brand-white font-semibold text-lg font-bold"
        onRefresh={fetchData}
        child={<NoData displayedMessage="Failed Fetching ranks and points." />}
      />
    );

  return (
    <PreDisplay
      title="Ranks And Points"
      titleClass="text-brand-white font-semibold text-lg font-bold"
      onRefresh={fetchData}
      child={
        <div className="container flex w-full">
          <ul className="flex flex-col">
            <RanksAndPointsItem
              team={homeTeam}
              data={teamsLeagueStats?.homeTeam ?? []}
            />

            <RanksAndPointsItem
              team={awayTeam}
              data={teamsLeagueStats?.awayTeam ?? []}
            />
          </ul>
        </div>
      }
    />
  );
};

interface RanksAndPointsItemProps {
  team: string;
  data: PositionAndPoints[];
}

const RanksAndPointsItem = ({ team, data }: RanksAndPointsItemProps) => {
  return (
    <li className="flex flex-col mt-2 mb-2">
      <div className="select-none cursor-pointer rounded-md flex flex-col transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
        <div className="flex mb-1 flex-wrap">
          <div className="flex flex-wrap items-center justify-center rounded-md w-6 h-6 bg-brand-royalblue">
          🏆
          </div>
          <span
            data-testid="grp-label"
            className="text-sm text-brand-white m-1 font-semibold text-md flex items-left gap-1"
          >
            {team}
          </span>
        </div>
        <div data-testid="grp-data" className="flex flex-row">
          <div className="font-medium flex flex-row flex-wrap gap-1 text-xs text-white">
            {data.length === 0 ? (
              <span className="text-sm text-gray-400">No data available</span>
            ) : (
              data.map((result, idx) => (
                <div
                  key={idx}
                  className="flex flex-row gap-2 items-center bg-brand-card px-2 py-1 rounded-lg"
                >
                  <span className="text-xs font-semibold text-brand-green uppercase leading-5">
                    {result.description}
                  </span>
                  <span className="text-xs text-brand-white m-1 font-semibold text-md flex items-left gap-1">
                    Pos: {result.position}
                  </span>
                  <span className="text-xs text-brand-white m-1 font-semibold text-md flex items-left gap-1">
                    Pts: {result.points}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </li>
  );
};
