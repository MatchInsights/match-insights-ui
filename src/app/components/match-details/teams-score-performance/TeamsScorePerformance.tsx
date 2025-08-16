import { useEffect, useState } from "react";
import { TeamsScorePerformance } from "../../../types/types";
import FetchStatus from "../../fetch-status/FetchStatus";
import { ApiService } from "../../../services/apiService";
import PreDisplay from "../../pre-display/PreDisplay";

interface TeamsScorePerformanceProps {
  homeTeamId: number;
  homeTeam: string;
  awayTeamId: number;
  awayTeam: string;
  leagueId: number;
  apiService: ApiService;
}

const TeamsScorePerformanceComponent = ({
  apiService,
  homeTeamId,
  homeTeam,
  awayTeamId,
  awayTeam,
  leagueId,
}: TeamsScorePerformanceProps) => {
  const [data, setData] = useState<TeamsScorePerformance | null>(null);
  const [loading, setLoading] = useState(true);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (isShown) {
      setLoading(true);
      apiService
        .fetchTeamsScorePerformance(homeTeamId, awayTeamId, leagueId)
        .then((result: TeamsScorePerformance) => {
          setData(result);
        })
        .catch(() => {
          setData(null);
        })
        .finally(() => setLoading(false));
    }
  }, [homeTeamId, awayTeamId, leagueId, isShown]);

  const performanceColor = (status?: string) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("good")) return "bg-brand-success text-black";
    return "bg-brand-orange text-white";
  };

  if (loading && isShown)
    return (
      <PreDisplay
        title="Teams Score Performance"
        expanded={isShown}
        setExpanded={setIsShown}
        titleClass="text-brand-yellow font-semibold flex-grow text-2xl font-bold"
        child={<FetchStatus type="loading" message="Loading Data..." />}
      />
    );

  if (!loading && !data && isShown)
    return (
      <PreDisplay
        title="Teams Score Performance"
        expanded={isShown}
        setExpanded={setIsShown}
        titleClass="text-brand-yellow font-semibold flex-grow text-2xl font-bold"
        child={<FetchStatus type="info" message="No data available" />}
      />
    );

  return (
    <PreDisplay
      title="Teams Score Performance"
      expanded={isShown}
      setExpanded={setIsShown}
      titleClass="text-brand-yellow font-semibold flex-grow text-2xl font-bold"
      child={
        <div className="bg-brand-navbar p-6 md:p-8 rounded-2xl w-full flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-brand-white text-base font-medium">
              {homeTeam}:
            </p>
            <span
              className={`px-3 py-1 font-semibold ${performanceColor(
                data?.homeTeamPerformance
              )}`}
            >
              {data?.homeTeamPerformance}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <p className="text-brand-white text-base font-medium">
              {awayTeam}:
            </p>
            <span
              className={`px-3 py-1 font-semibold ${performanceColor(
                data?.awayTeamPerformance
              )}`}
            >
              {data?.awayTeamPerformance}
            </span>
          </div>
        </div>
      }
    />
  );
};

export default TeamsScorePerformanceComponent;
