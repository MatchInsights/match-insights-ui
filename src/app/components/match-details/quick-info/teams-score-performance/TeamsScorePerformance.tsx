import { useEffect, useState } from "react";
import { TeamsScorePerformance } from "../../../../types/types";
import NoData from "../../../no-data/NoData";
import { ApiService } from "../../../../services/apiService";
import PreDisplay from "../../../pre-display/PreDisplay";

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

  const fetchData = () => {
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
  };

  useEffect(() => {
    fetchData();
  }, [homeTeamId, awayTeamId, leagueId]);

  const performanceColor = (status?: string) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("good")) return "bg-brand-success text-black";
    return "bg-brand-orange text-white";
  };

  if (loading)
    return (
      <PreDisplay
        title="Teams Score Performance"
        onRefresh={fetchData}
        titleClass="text-brand-white font-semibold text-lg font-bold"
        child={
          <NoData displayedMessage="Fetching Score Perfomance for both teams." />
        }
      />
    );

  if (!loading && !data)
    return (
      <PreDisplay
        title="Teams Score Performance"
        onRefresh={fetchData}
        titleClass="text-brand-white font-semibold text-lg font-bold"
        child={
          <NoData displayedMessage="Failed Fetching Score Perfomance for both teams." />
        }
      />
    );

  return (
    <PreDisplay
      title="Teams Score Performance"
      onRefresh={fetchData}
      titleClass="text-brand-white font-semibold text-lg font-bold"
      child={
        <div className="w-full flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-2 font-bold ${performanceColor(
                data?.homeTeamPerformance
              )}`}
            >
              {data?.homeTeamPerformance}
            </span>{" "}
            <p className="text-brand-white text-sm">{homeTeam}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-2 font-semibold ${performanceColor(
                data?.awayTeamPerformance
              )}`}
            >
              {data?.awayTeamPerformance}
            </span>
            <p className="text-brand-white text-sm">{awayTeam}</p>
          </div>
        </div>
      }
    />
  );
};

export default TeamsScorePerformanceComponent;
