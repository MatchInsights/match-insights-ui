import { useEffect, useState } from "react";
import { TeamsRestStatus } from "../../../../types/types";
import NoData from "../../../no-data/NoData";
import { ApiService } from "../../../../services/apiService";
import PreDisplay from "../../../pre-display/PreDisplay";

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

  const statusColor = (status?: string) => {
    const s = status?.toLowerCase() || "";

    if (s.includes("severe")) return "bg-brand-danger text-black";
    if (s.includes("good")) return "bg-brand-success text-black";
    return "bg-brand-yellow text-black";
  };

  if (loading)
    return (
      <PreDisplay
        title="Teams Rest Status"
        titleClass="text-brand-white font-semibold text-lg font-bold"
        child={
          <NoData displayedMessage="Fetching Rest status for both teams." />
        }
        onRefresh={fetchData}
      />
    );

  if (!loading && !data)
    return (
      <PreDisplay
        title="Teams Rest Status"
        titleClass="text-brand-white font-semibold text-lg font-bold"
        child={
          <NoData displayedMessage="Failed Fetching Rest status for both teams." />
        }
        onRefresh={fetchData}
      />
    );

  return (
    <PreDisplay
      title="Teams Rest Status"
      onRefresh={fetchData}
      titleClass="text-brand-white font-semibold text-lg font-bold"
      child={
        <div className="w-full flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-3 font-semibold ${statusColor(
                data?.homeTeamStatus
              )}`}
            >
              {data?.homeTeamStatus}
            </span>
            <p className="text-brand-white text-sm font-medium">{homeTeam}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-3  font-semibold ${statusColor(
                data?.awayTeamStatus
              )}`}
            >
              {data?.awayTeamStatus}
            </span>
            <p className="text-brand-white text-sm font-medium">{awayTeam}</p>
          </div>
        </div>
      }
    />
  );
};

export default TeamsRestStatusComponent;
