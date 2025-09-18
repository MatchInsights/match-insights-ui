import { useEffect, useState } from "react";
import { ApiService } from "../../../services/apiService";
import { Bet } from "../../../types/types";
import NoData from "../../no-data/NoData";
import PreDisplay from "../../pre-display/PreDisplay";

interface MatchOddsProps {
  fixtureId: number;
  apiService: ApiService;
}

export default function MatchOdds({ fixtureId, apiService }: MatchOddsProps) {
  const [odds, setOdds] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    apiService
      .fetchOdds(fixtureId)
      .then((res) => {
        setOdds(res);
      })
      .catch(() => {
        setOdds([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [fixtureId]);

  if (loading)
    return (
      <PreDisplay
        title={"Match Odds"}
        onRefresh={fetchData}
        child={<NoData displayedMessage="Fetching Match Odds." />}
        titleClass="text-brand-yellow font-semibold text-lg font-bold"
      />
    );

  if (!loading && odds.length === 0)
    return (
      <PreDisplay
        title={"Match Odds"}
        onRefresh={fetchData}
        child={<NoData displayedMessage="Match Odds are not available." />}
        titleClass="text-brand-white font-semibold text-lg font-bold"
      />
    );

  return (
    <PreDisplay
      title={"Match Odds"}
      titleClass="text-brand-white font-semibold text-lg font-bold"
      onRefresh={fetchData}
      child={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {odds.map((odd, index) => (
            <div key={index} className="p-4 text-sm text-brand-white">
              <p className="flex flex-col gap-4 p-4 text-xs font-semibold text-brand-yellow uppercase leading-5">
                {odd.betName}
              </p>

              <div className="flex flex-col gap-1 p-4 text-xs font-semibold text-brand-white uppercase leading-5">
                {odd.values.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-brand-navbar px-4 py-2 font-medium"
                  >
                    {item.label}:{" "}
                    <span className="font-semibold text-brand-green">{item.odd}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
}
