import { useEffect, useState } from "react";
import { TeamsRestStatus } from "../../../../types/types";
import NoData from "../../../no-data/NoData";
import { ApiService } from "../../../../services/apiService";
import PreDisplay from "../../../pre-display/PreDisplay";
import { ArrowStatusTile } from "../../../status-tile/ArrowStatusTile";

interface LastFiveMatchesProps {
  homeTeamId: number;
  homeTeam: string;
  awayTeamId: number;
  awayTeam: string;
  fixtureDate: string;
  apiService: ApiService;
}

const TeamsRestStatusComponent = ({
  apiService,
  homeTeamId,
  homeTeam,
  awayTeamId,
  awayTeam,
  fixtureDate,
}: LastFiveMatchesProps) => {
  const [data, setData] = useState<TeamsRestStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    apiService
      .fetchTeamsRestStatus(homeTeamId, awayTeamId, fixtureDate)
      .then((result: TeamsRestStatus) => {
        setData(result);
      })
      .catch(() => {
        setData(null);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [homeTeamId, awayTeamId, fixtureDate]);

  const isUp = (status?: string) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("good")) return true;
    return false;
  };

  const isFlat = (status?: string) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("moderate") || s.includes("unknown") || s.length == 0)
      return true;
    return false;
  };

  if (loading)
    return (
      <PreDisplay
        title="Rest Status"
        titleClass="text-brand-yellow font-semibold text-lg font-bold"
        child={
          <NoData displayedMessage="Fetching Rest status for both teams." />
        }
        onRefresh={fetchData}
      />
    );

  if (!loading && !data)
    return (
      <PreDisplay
        title="Rest Status"
        titleClass="text-brand-white font-semibold text-lg font-bold"
        child={
          <NoData displayedMessage="Failed Fetching Rest status for both teams." />
        }
        onRefresh={fetchData}
      />
    );

  return (
    <PreDisplay
      title="Rest Status"
      onRefresh={fetchData}
      titleClass="text-brand-white font-semibold text-lg font-bold"
      child={
        <div className="grid grid-cols-1 gap-1 w-full">
          <ArrowStatusTile
            isUp={isUp(data?.homeTeamStatus)}
            description={homeTeam}
            status={data?.homeTeamStatus ?? ""}
            isFlat={isFlat(data?.homeTeamStatus ?? "")}
          />
          <ArrowStatusTile
            isUp={isUp(data?.awayTeamStatus)}
            description={awayTeam}
            status={data?.awayTeamStatus ?? ""}
            isFlat={isFlat(data?.awayTeamStatus)}
          />
        </div>
      }
    />
  );
};

export default TeamsRestStatusComponent;
