import { useEffect, useState } from "react";
import { TeamForm } from "../../../../types/types";
import NoData from "../../../no-data/NoData";
import { ApiService } from "../../../../services/apiService";
import PreDisplay from "../../../pre-display/PreDisplay";

interface LastFiveMatchesProps {
  homeTeamId: number;
  homeTeam: string;
  awayTeamId: number;
  awayTeam: string;
  apiService: ApiService;
}

const LastFiveMatches = ({
  apiService,
  homeTeamId,
  homeTeam,
  awayTeamId,
  awayTeam,
}: LastFiveMatchesProps) => {
  const [homeTeamData, setHomeTeamData] = useState<string[]>([]);
  const [awayTeamData, setAwayTeamData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const colorMap: Record<string, string> = {
    W: "bg-brand-green",
    D: "bg-brand-yellow",
    L: "bg-brand-red",
  };

  const fetchData = () => {
    setLoading(true);
    apiService
      .fetchLastFiveMatches(homeTeamId, awayTeamId)
      .then((result: TeamForm) => {
        const { homeTeamLastFive, awayTeamLastFive } = result;
        setHomeTeamData(homeTeamLastFive);
        setAwayTeamData(awayTeamLastFive);
      })
      .catch(() => {
        setHomeTeamData([]);
        setAwayTeamData([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [homeTeamId, awayTeamId]);

  if (loading)
    return (
      <PreDisplay
        title="Last Five Results"
        onRefresh={fetchData}
        titleClass="text-brand-yellow font-semibold text-lg font-bold"
        child={<NoData displayedMessage="Fetching Last Five Matches." />}
      />
    );

  if (!loading && homeTeamData.length === 0 && awayTeamData.length === 0)
    return (
      <PreDisplay
        title="Last Five Results"
        onRefresh={fetchData}
        titleClass="text-brand-white font-semibold text-lg font-bold"
        child={
          <NoData displayedMessage="Last Five Matches results are not available." />
        }
      />
    );

  const renderRow = (teamName: string, data: string[]) => (
    <li className="flex flex-row items-center justify-between py-2 border-b border-gray-700 w-full">
      {/* Bloque nombre + pelota */}
      <div className="flex items-center gap-2 min-w-[100px] flex-shrink-2">
        <div className="flex items-center justify-center w-7 h-7 bg-brand-royalblue rounded-md">
          ⚽️
        </div>
        <span
          className="text-brand-white font-semibold text-sm font-bold truncate"
          title={teamName}
        >
          {teamName}
        </span>
      </div>

      {/* Resultados en la misma fila */}
      <div className="flex gap-1 ml-1">
        {data.length === 0 ? (
          <span className="text-base text-white">No data</span>
        ) : (
          data.map((result, idx) => (
            <span
              key={idx}
              className={`w-5 h-5 flex items-center justify-center font-bold text-sm text-black ${colorMap[result]}`}
            >
              {result}
            </span>
          ))
        )}
      </div>
    </li>
  );

  return (
    <PreDisplay
      title="Last Five Results"
      onRefresh={fetchData}
      titleClass="text-brand-white font-semibold text-lg font-bold"
      child={
        <div className="container w-full">
          <ul className="flex flex-col w-full">
            {renderRow(homeTeam, homeTeamData)}
            {renderRow(awayTeam, awayTeamData)}
          </ul>
        </div>
      }
    />
  );
};

export default LastFiveMatches;
