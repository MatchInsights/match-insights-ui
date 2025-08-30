import { useEffect, useState } from "react";
import { OddsWinnerFeeling } from "../../../../types/types";
import NoData from "../../../no-data/NoData";
import { ApiService } from "../../../../services/apiService";
import PreDisplay from "../../../pre-display/PreDisplay";

interface OddsWinnerFeelingProps {
  homeTeam: string;
  awayTeam: string;
  fixtureId: number;
  apiService: ApiService;
}

const OddsWinnerFeelingComponent = ({
  apiService,
  homeTeam,
  awayTeam,
  fixtureId,
}: OddsWinnerFeelingProps) => {
  const [data, setData] = useState<OddsWinnerFeeling | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    apiService
      .fetchOddWinnerFeeling(fixtureId)
      .then((result: OddsWinnerFeeling) => {
        setData(result);
      })
      .catch(() => {
        setData(null);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [fixtureId]);

  const feelingColor = (status?: string) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("strong")) return "bg-brand-success text-black";
    return "bg-brand-white text-black";
  };

  if (loading)
    return (
      <PreDisplay
        title="Odds Winner Feeling"
        titleClass="text-brand-orange font-semibold text-lg font-bold"
        onRefresh={fetchData}
        child={<NoData displayedMessage="Fetching Odds Winner Feeling." />}
      />
    );

  if (!loading && !data)
    return (
      <PreDisplay
        title="Odds Winner Feeling"
        onRefresh={fetchData}
        titleClass="text-brand-orange font-semibold text-lg font-bold"
        child={
          <NoData displayedMessage="Failed Fetching Odds Winner Feeling." />
        }
      />
    );

  return (
    <PreDisplay
      title="Odds Winner Feeling"
      onRefresh={fetchData}
      titleClass="text-brand-orange font-semibold text-lg font-bold"
      child={
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-3 font-semibold ${feelingColor(data?.home)}`}>
              {data?.home}
            </span>
            <p className="text-brand-white text-sm font-medium">{homeTeam}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-3 font-semibold ${feelingColor(data?.draw)}`}>
              {data?.draw}
            </span>
            <p className="text-brand-white text-sm font-medium">Draw</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-3 py-1 font-semibold ${feelingColor(data?.away)}`}
            >
              {data?.away}
            </span>
            <p className="text-brand-white text-sm font-medium">{awayTeam}</p>
          </div>
        </div>
      }
    />
  );
};

export default OddsWinnerFeelingComponent;
