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
    W: "bg-brand-orange",
    D: "bg-brand-yellow",
    L: "bg-white",
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
        title="Last Five Matches Results"
        onRefresh={fetchData}
        titleClass="text-brand-white font-semibold text-lg font-bold"
        child={<NoData displayedMessage="Fetching Last Five Matches." />}
      />
    );

  if (!loading && homeTeamData.length === 0 && awayTeamData.length === 0)
    return (
      <PreDisplay
        title="Last Five Matches"
        onRefresh={fetchData}
        titleClass="text-brand-white font-semibold text-lg font-bold"
        child={
          <NoData displayedMessage="Last Five Matches results are not available." />
        }
      />
    );

  return (
    <PreDisplay
      title="Last Five Matches"
      onRefresh={fetchData}
      titleClass="text-brand-white font-semibold text-lg font-bold"
      child={
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-left gap-2 flex-wrap">
            <div className="flex gap-2">
              {homeTeamData.length === 0 ? (
                <span className="text-base text-white">No data available</span>
              ) : (
                homeTeamData.map((result, idx) => (
                  <span
                    key={idx}
                    className={`w-5 h-5 flex items-center justify-center font-bold text-black ${colorMap[result]}`}
                  >
                    {result}
                  </span>
                ))
              )}
            </div>
            <p className="text-brand-white text-sm">{homeTeam}</p>
          </div>

          <div className="flex justify-left gap-2 flex-wrap">
            <div className="flex gap-2">
              {awayTeamData.length === 0 ? (
                <span className="text-xs text-white">No data available</span>
              ) : (
                awayTeamData.map((result, idx) => (
                  <span
                    key={idx}
                    className={`w-5 h-5 flex items-center justify-center font-bold text-black ${colorMap[result]}`}
                  >
                    {result}
                  </span>
                ))
              )}
            </div>
            <p className="text-brand-white text-sm">{awayTeam}</p>
          </div>
        </div>
      }
    />
  );
};

export default LastFiveMatches;
