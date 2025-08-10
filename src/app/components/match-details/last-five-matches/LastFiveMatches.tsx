import { useEffect, useState } from "react";
import { TeamForm } from "../../../types/types";
import FetchStatus from "../../fetch-status/FetchStatus";
import { ApiService } from "../../../services/apiService";
import PreDisplay from "../../pre-display/PreDisplay";

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

  const [isShown, setIsShown] = useState(false);

  const colorMap: Record<string, string> = {
    W: "bg-brand-orange",
    D: "bg-brand-yellow",
    L: "bg-white",
  };

  useEffect(() => {
    if (isShown) {
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
    }
  }, [homeTeamId, awayTeamId, isShown]);

  if (loading && isShown)
    return (
      <PreDisplay
        title="Last Five Matches"
        expanded={isShown}
        setExpanded={setIsShown}
        child={<FetchStatus type="loading" message="Loading Data..." />}
      />
    );

  if (
    !loading &&
    homeTeamData.length === 0 &&
    awayTeamData.length === 0 &&
    isShown
  )
    return (
      <PreDisplay
        title="Last Five Matches"
        expanded={isShown}
        setExpanded={setIsShown}
        child={<FetchStatus type="info" message="No data available" />}
      />
    );

  return (
    <PreDisplay
      title="Last Five Matches"
      titleClass="font-semibold flex-grow text-brand-white text-2xl font-bold"
      expanded={isShown}
      setExpanded={setIsShown}
      child={
        <div className="bg-brand-navbar p-6 md:p-8 rounded-2xl w-full flex flex-col gap-4">
          <div className="flex justify-left items-center gap-4 flex-wrap">
            <div className="flex gap-2">
              {homeTeamData.length === 0 ? (
                <span className="text-base text-white">No data available</span>
              ) : (
                homeTeamData.map((result, idx) => (
                  <span
                    key={idx}
                    className={`w-5 h-5 flex items-center justify-center font-bold text-black rounded ${colorMap[result]}`}
                  >
                    {result}
                  </span>
                ))
              )}
            </div>
            <p className="text-brand-white text-base  font-medium whitespace-nowrap">
              {homeTeam}
            </p>
          </div>

          <div className="flex justify-left  items-center gap-4 flex-wrap">
            <div className="flex gap-2">
              {awayTeamData.length === 0 ? (
                <span className="text-xs text-white">No data available</span>
              ) : (
                awayTeamData.map((result, idx) => (
                  <span
                    key={idx}
                    className={`w-5 h-5 flex items-center justify-center font-bold text-black rounded ${colorMap[result]}`}
                  >
                    {result}
                  </span>
                ))
              )}
            </div>
            <p className="text-brand-white text-base md:text-base font-medium whitespace-nowrap">
              {awayTeam}
            </p>
          </div>
        </div>
      }
    />
  );
};

export default LastFiveMatches;
