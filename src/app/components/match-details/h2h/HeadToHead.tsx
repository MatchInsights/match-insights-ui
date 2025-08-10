import { useEffect, useState } from "react";
import { H2HDetails } from "../../../types/types";
import FetchStatus from "../../fetch-status/FetchStatus";
import { ApiService } from "../../../services/apiService";

interface HeadToHeadProps {
  homeTeamId: number;
  awayTeamId: number;
  apiService: ApiService;
}

const HeadToHead = ({
  apiService,
  homeTeamId,
  awayTeamId,
}: HeadToHeadProps) => {
  const [data, setData] = useState<H2HDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService
      .fetchHeadToHead(homeTeamId, awayTeamId)
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setData([]);
      });
  }, [homeTeamId, awayTeamId]);

  if (loading) return <FetchStatus type="loading" message="Loading Data..." />;

  if (!loading && data.length === 0) {
    return (
      <div className="w-full">
        <FetchStatus type="info" message="No head to head data available." />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <h3
        data-testid="h2h"
        className="text-brand-yellow text-3xl font-bold text-center"
      >
        Head to Head
      </h3>

      {data.map((match, index) => (
        <div
          key={index}
          className="bg-brand-card rounded-2xl p-6 md:p-8 flex flex-col gap-6 w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center text-center md:text-left">
            <div className="text-base text-brand-lightGray space-y-2">
              <p>
                <span className="text-brand-yellow font-semibold">Date:</span>{" "}
                {new Date(match.date).toLocaleDateString()}
              </p>
              <p>
                <span className="text-brand-yellow font-semibold">Venue:</span>{" "}
                {match.venue.name}
              </p>
              <p>
                <span className="text-brand-yellow font-semibold">League:</span>{" "}
                {match.leagueName}
              </p>
              <p>
                <span className="text-brand-yellow font-semibold">Season:</span>{" "}
                {match.season}
              </p>
              {match.round && (
                <p>
                  <span className="text-brand-yellow font-semibold">
                    Round:
                  </span>{" "}
                  {match.round}
                </p>
              )}
            </div>

            <div className="text-base text-brand-white space-y-2">
              <p>
                <span className="text-brand-lightGray font-medium">
                  Half Time:
                </span>{" "}
                {match.homeHalfTimeGoal} - {match.awayHalfTimeGoal}
              </p>
              <p>
                <span className="text-brand-lightGray font-medium">
                  Full Time:
                </span>{" "}
                {match.homeFullTimeGoal} - {match.awayFullTimeGoal}
              </p>
              <p>
                <span className="text-brand-lightGray font-medium">
                  Extra Time:
                </span>{" "}
                {match.homeExtraTimeGoal} - {match.awayExtraTimeGoal}
              </p>
              <p>
                <span className="text-brand-lightGray font-medium">
                  Penalties:
                </span>{" "}
                {match.homePenalty} - {match.awayPenalty}
              </p>
            </div>

            <div className="text-lg font-bold text-brand-success flex items-center justify-center md:justify-end">
              <div>
                Winner: <span className="text-white">{match.winner}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeadToHead;
