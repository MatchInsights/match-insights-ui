import { useEffect, useState } from "react";
import { TeamsScorePerformance } from "../../../../types/types";
import NoData from "../../../no-data/NoData";
import { ApiService } from "../../../../services/apiService";
import PreDisplay from "../../../pre-display/PreDisplay";
import { ArrowStatusTile } from "../../../status-tile/ArrowStatusTile";

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

  const isUp = (status?: string) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("good")) return true;
    return false;
  };

  const isFlat = (status?: string) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("data") || s.length === 0) return true;
    return false;
  };

  if (loading)
    return (
      <PreDisplay
        title="Performance"
        onRefresh={fetchData}
        titleClass="text-brand-yellow font-semibold text-lg font-bold"
        child={
          <NoData displayedMessage="Fetching Score Perfomance for both teams." />
        }
      />
    );

  if (!loading && !data)
    return (
      <PreDisplay
        title="Performance"
        onRefresh={fetchData}
        titleClass="text-brand-white font-semibold text-lg font-bold"
        child={
          <NoData displayedMessage="Failed Fetching Score Perfomance for both teams." />
        }
      />
    );

  return (
    <PreDisplay
      title="Performance"
      onRefresh={fetchData}
      titleClass="text-brand-white font-semibold text-lg font-bold"
      child={
        <div className="grid grid-cols-1 gap-1 w-full text- font-bold ">
          <ArrowStatusTile
            status={data?.homeTeamPerformance ?? ""}
            isFlat={isFlat(data?.homeTeamPerformance ?? "")}
            isUp={isUp(data?.homeTeamPerformance)}
            description={homeTeam}
          />
          <ArrowStatusTile
            isUp={isUp(data?.awayTeamPerformance)}
            description={awayTeam}
            status={data?.awayTeamPerformance ?? ""}
            isFlat={isFlat(data?.awayTeamPerformance)}
          />
        </div>
      }
    />
  );
};

export default TeamsScorePerformanceComponent;
