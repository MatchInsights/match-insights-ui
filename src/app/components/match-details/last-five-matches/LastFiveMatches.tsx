import { useEffect, useState } from "react";
import { TeamForm } from "../../../types/types";
import FetchStatus from "../../fetch-status/FetchStatus";

interface LastFiveMatchesProps {
  homeTeamId: number;
  homeTeam: string;
  awayTeamId: number;
  awayTeam: string;
  fetchLastFiveMatches: (
    homeTeamId: number,
    awayTeamId: number
  ) => Promise<TeamForm>;
}

const LastFiveMatches = ({
  fetchLastFiveMatches,
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

  useEffect(() => {
    fetchLastFiveMatches(homeTeamId, awayTeamId).then((result) => {
      const { homeTeamLastFive, awayTeamLastFive } = result;
      setHomeTeamData(homeTeamLastFive);
      setAwayTeamData(awayTeamLastFive);
      setLoading(false);
    });
  }, [homeTeamId, awayTeamId]);

  if (loading)
    return <FetchStatus type="loading" message="Loading Teams Form..." />;

  return (
    <div className="bg-brand-navbar p-6 md:p-8 rounded-2xl shadow-md w-full flex flex-col gap-4">
      <h3
        data-testid="last-five-matches"
        className="text-brand-yellow text-xl font-semibold"
      >
        Last Five Matches
      </h3>

      <div className="flex justify-left items-center gap-4 flex-wrap">
        <div className="flex gap-2">
          {homeTeamData.length === 0 ? (
            <span className="text-xs text-white">No data available</span>
          ) : (
            homeTeamData.map((result, idx) => (
              <span
                key={idx}
                className={`w-5 h-5 flex items-center justify-center text-xs font-bold text-black rounded ${colorMap[result]}`}
              >
                {result}
              </span>
            ))
          )}
        </div>
        <p className="text-brand-white text-sm md:text-base font-medium whitespace-nowrap">
          {homeTeam}
        </p>
      </div>

      <div className="flex justify-left items-center gap-4 flex-wrap">
        <div className="flex gap-2">
          {awayTeamData.length === 0 ? (
            <span className="text-xs text-white">No data available</span>
          ) : (
            awayTeamData.map((result, idx) => (
              <span
                key={idx}
                className={`w-5 h-5 flex items-center justify-center text-xs font-bold text-black rounded ${colorMap[result]}`}
              >
                {result}
              </span>
            ))
          )}
        </div>
        <p className="text-brand-white text-sm md:text-base font-medium whitespace-nowrap">
          {awayTeam}
        </p>
      </div>
    </div>
  );
};

export default LastFiveMatches;
