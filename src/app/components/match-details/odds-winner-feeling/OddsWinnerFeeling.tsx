import { useEffect, useState } from "react";
import { OddsWinnerFeeling } from "../../../types/types";
import NoData from "../../no-data/NoData";
import { ApiService } from "../../../services/apiService";
import PreDisplay from "../../pre-display/PreDisplay";

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
  const [isShown, setIsShown] = useState(false);

  const fetchData = () => {
    if (isShown) {
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
    }
  };

  useEffect(() => {
    fetchData();
  }, [fixtureId, isShown]);

  const feelingColor = (status?: string) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("strong")) return "bg-brand-success text-black";
    return "bg-brand-white text-black";
  };

  if (loading && isShown)
    return (
      <PreDisplay
        title="Odds Winner Feeling"
        expanded={isShown}
        setExpanded={setIsShown}
        titleClass="text-brand-white font-semibold flex-grow text-2xl font-bold"
        onRefresh={fetchData}
        child={<NoData />}
      />
    );

  if (!loading && !data && isShown)
    return (
      <PreDisplay
        title="Odds Winner Feeling"
        expanded={isShown}
        setExpanded={setIsShown}
        onRefresh={fetchData}
        titleClass="text-brand-white font-semibold flex-grow text-2xl font-bold"
        child={<NoData />}
      />
    );

  return (
    <PreDisplay
      title="Odds Winner Feeling"
      expanded={isShown}
      setExpanded={setIsShown}
      onRefresh={fetchData}
      titleClass="text-brand-white font-semibold flex-grow text-2xl font-bold"
      child={
        <div className="bg-brand-navbar p-6 md:p-8 rounded-2xl w-full flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-brand-white text-base font-medium">
              {homeTeam}:
            </p>
            <span
              className={`px-3 py-1 font-semibold ${feelingColor(data?.home)}`}
            >
              {data?.home}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <p className="text-brand-white text-base font-medium">Draw:</p>
            <span
              className={`px-3 py-1  font-semibold ${feelingColor(data?.draw)}`}
            >
              {data?.draw}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <p className="text-brand-white text-base font-medium">
              {awayTeam}:
            </p>
            <span
              className={`px-3 py-1 font-semibold ${feelingColor(data?.away)}`}
            >
              {data?.away}
            </span>
          </div>
        </div>
      }
    />
  );
};

export default OddsWinnerFeelingComponent;
