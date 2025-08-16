import { useEffect, useState } from "react";
import { TeamsRestStatus } from "../../../types/types";
import FetchStatus from "../../fetch-status/FetchStatus";
import { ApiService } from "../../../services/apiService";
import PreDisplay from "../../pre-display/PreDisplay";

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
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (isShown) {
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
    }
  }, [homeTeamId, awayTeamId, fixtureDate, isShown]);

  const statusColor = (status?: string) => {
    const s = status?.toLowerCase() || "";

    if (s.includes("severe")) return "bg-brand-danger text-black";
    if (s.includes("good")) return "bg-brand-success text-black";
    return "bg-brand-yellow text-black";
  };

  if (loading && isShown)
    return (
      <PreDisplay
        title="Teams Rest Status"
        expanded={isShown}
        setExpanded={setIsShown}
        titleClass="text-brand-white font-semibold flex-grow text-2xl font-bold"
        child={<FetchStatus type="loading" message="Loading Data..." />}
      />
    );

  if (!loading && !data && isShown)
    return (
      <PreDisplay
        title="Teams Rest Status"
        expanded={isShown}
        setExpanded={setIsShown}
        titleClass="text-brand-white font-semibold flex-grow text-2xl font-bold"
        child={<FetchStatus type="info" message="No data available" />}
      />
    );

  return (
    <PreDisplay
      title="Teams Rest Status"
      expanded={isShown}
      setExpanded={setIsShown}
      titleClass="text-brand-white font-semibold flex-grow text-2xl font-bold"
      child={
        <div className="bg-brand-navbar p-6 md:p-8 rounded-2xl w-full flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-brand-white text-base font-medium">
              {homeTeam}:
            </p>
            <span
              className={`px-3 py-1 rounded-full font-semibold ${statusColor(
                data?.homeTeamStatus
              )}`}
            >
              {data?.homeTeamStatus}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <p className="text-brand-white text-base font-medium">
              {awayTeam}:
            </p>
            <span
              className={`px-3 py-1 rounded-full font-semibold ${statusColor(
                data?.awayTeamStatus
              )}`}
            >
              {data?.awayTeamStatus}
            </span>
          </div>
        </div>
      }
    />
  );
};

export default TeamsRestStatusComponent;
