import { useEffect, useState } from "react";
import { H2HDetails } from "../../../types/types";
import FetchStatus from "../../fetch-status/FetchStatus";

interface HeadToHeadProps {
  homeTeamId: number;
  awayTeamId: number;
  fetchHeadToHead: (
    homeTeamId: number,
    awayTeamId: number
  ) => Promise<H2HDetails[]>;
}

const HeadToHead = ({
  fetchHeadToHead,
  homeTeamId,
  awayTeamId,
}: HeadToHeadProps) => {
  const [data, setData] = useState<H2HDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeadToHead(homeTeamId, awayTeamId).then((result) => {
      setData(result);
      setLoading(false);
    });
  }, [homeTeamId, awayTeamId]);

  if (loading)
    return <FetchStatus type="loading" message="Loading H2H Data..." />;

  if (data.length === 0) {
    return (
      <div className="w-full">
        <FetchStatus type="info" message="No head-to-head data available." />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <h3
        data-testid="h2h"
        className="text-brand-yellow text-xl font-semibold text-center md:text-left"
      >
        Head to Head
      </h3>

      {data.map((match, index) => (
        <div
          key={index}
          className="bg-brand-card rounded-2xl shadow-md p-0 flex flex-col gap-2 w-full"
        >
          <div className="flex flex-col md:flex-row md:justify-between m-2 md:items-start gap-2">
            <div className="text-sm text-brand-lightGray text-center mt-6 md:text-left">
              <p>
                <span className="text-brand-yellow font-medium">Date:</span>{" "}
                {new Date(match.date).toLocaleDateString()}
              </p>
              <p>
                <span className="text-brand-yellow font-medium">Venue:</span>{" "}
                {match.venue.name}
              </p>
              <p>
                <span className="text-brand-yellow font-medium">League:</span>{" "}
                {match.leagueName}
              </p>
              <p>
                <span className="text-brand-yellow font-medium">Season:</span>{" "}
                {match.season}
              </p>
              {match.round && (
                <p>
                  <span className="text-brand-yellow font-medium">Round:</span>{" "}
                  {match.round}
                </p>
              )}
            </div>

            <div className="text-sm text-brand-white text-center mt-6 md:text-right">
              <p>
                <span className="text-brand-lightGray">Half Time:</span>{" "}
                {match.homeHalfTimeGoal} - {match.awayHalfTimeGoal}
              </p>
              <p>
                <span className="text-brand-lightGray">Full Time:</span>{" "}
                {match.homeFullTimeGoal} - {match.awayFullTimeGoal}
              </p>
              <p>
                <span className="text-brand-lightGray">Extra Time:</span>{" "}
                {match.homeExtraTimeGoal} - {match.awayExtraTimeGoal}
              </p>
              <p>
                <span className="text-brand-lightGray">Penalties:</span>{" "}
                {match.homePenalty} - {match.awayPenalty}
              </p>
            </div>
          </div>

          <div className="text-sm font-semibold text-brand-success text-center p-4 m-2 md:text-right">
            Winner: <span className="text-white">{match.winner}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeadToHead;
