import { useEffect, useState } from "react";
import { OddsWinnerFeeling } from "../../../../types/types";
import NoData from "../../../no-data/NoData";
import { ApiService } from "../../../../services/apiService";
import PreDisplay from "../../../pre-display/PreDisplay";
import { ArrowStatusTile } from "../../../status-tile/ArrowStatusTile";

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

  const isUp = (status?: string) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("strong")) return true;
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
        <div className="grid grid-cols-1 gap-2 w-full">
          <ArrowStatusTile
            isUp={isUp(data?.home)}
            description={data?.home ?? ""}
            status={homeTeam}
            isFlat={isFlat(data?.home ?? "")}
          />
          <ArrowStatusTile
            isUp={isUp(data?.away)}
            description={data?.away ?? ""}
            status={awayTeam}
            isFlat={isFlat(data?.away)}
          />
          <ArrowStatusTile
            isUp={isUp(data?.draw)}
            description={data?.draw ?? ""}
            status={"draw"}
            isFlat={isFlat(data?.draw)}
          />
        </div>
      }
    />
  );
};

export default OddsWinnerFeelingComponent;
