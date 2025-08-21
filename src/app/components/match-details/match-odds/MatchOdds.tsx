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
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (isShown) {
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
    }
  }, [fixtureId, isShown]);

  if (loading && isShown)
    return (
      <PreDisplay
        title={"Match Odds"}
        expanded={isShown}
        setExpanded={setIsShown}
        child={<NoData />}
      />
    );

  if (!loading && odds.length === 0 && isShown)
    return (
      <PreDisplay
        title={"Match Odds"}
        expanded={isShown}
        setExpanded={setIsShown}
        child={<NoData />}
      />
    );

  return (
    <PreDisplay
      title={"Match Odds"}
      titleClass="text-brand-white font-semibold flex-grow text-2xl font-bold"
      expanded={isShown}
      setExpanded={setIsShown}
      child={
        <div className="w-full space-y-4">
          {odds.map((odd, index) => (
            <div
              key={index}
              className="bg-brand-card p-4 rounded-lg text-sm text-brand-white"
            >
              <p className="text-brand-orange font-semibold mb-1">
                {odd.betName}
              </p>
              <div className="flex justify-between gap-2 flex-wrap text-brand-lightGray">
                {odd.values.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-brand-navbar px-2 py-1 rounded-lg text-xs font-medium"
                  >
                    {item.label}:{" "}
                    <span className="text-brand-white">{item.odd}</span>
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
