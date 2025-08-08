import { useEffect, useState } from "react";
import { ApiService } from "../../../services/apiService";
import { Bet } from "../../../types/types";
import FetchStatus from "../../fetch-status/FetchStatus";

interface MatchOddsProps {
  fixtureId: number;
  apiService: ApiService;
}

export default function MatchOdds({ fixtureId, apiService }: MatchOddsProps) {
  const [odds, setOdds] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService
      .fetchOdds(fixtureId)
      .then((res) => {
        setOdds(res);
        setLoading(false);
      })
      .catch(() => {
        setOdds([]);
        setLoading(false);
      });
  }, [fixtureId]);

  if (loading) return <FetchStatus type="loading" message="Loading Odds..." />;

  if (!loading && odds.length === 0)
    return <FetchStatus type="info" message="Odds Not Available" />;

  return (
    <div className="w-full space-y-4">
      <h3 className="text-brand-yellow text-2xl font-bold text-center">
        🧮 Match Odds
      </h3>
      {odds.map((odd, index) => (
        <div
          key={index}
          className="bg-brand-card p-4 rounded-lg text-sm text-brand-white"
        >
          <p className="text-brand-orange font-semibold mb-1">{odd.betName}</p>
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
  );
}
