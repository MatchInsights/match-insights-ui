import { useEffect, useState } from "react";
import { H2HDetails } from "../../../types/types";
import NoData from "../../no-data/NoData";
import { ApiService } from "../../../services/apiService";
import PreDisplay from "../../pre-display/PreDisplay";

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

  const fetchData = () => {
    setLoading(true);
    apiService
      .fetchHeadToHead(homeTeamId, awayTeamId)
      .then((result) => {
        setData(result);
      })
      .catch(() => {
        setData([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [homeTeamId, awayTeamId]);

  if (loading)
    return (
      <PreDisplay
        title="Head to Head"
        titleClass="text-brand-yellow font-semibold text-lg font-bold"
        onRefresh={fetchData}
        child={<NoData displayedMessage="Fetching H2H Info." />}
      />
    );

  if (!loading && data.length === 0) {
    return (
      <PreDisplay
        title="Head to Head"
        titleClass="text-brand-yellow font-semibold text-lg font-bold"
        onRefresh={fetchData}
        child={<NoData displayedMessage="H2H Info is not available." />}
      />
    );
  }

  return (
    <PreDisplay
      title="Head to Head"
      titleClass="text-brand-yellow font-semibold text-lg font-bold"
      onRefresh={fetchData}
      child={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((match, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 p-4  text-sm text-left "
            >
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

              <p className="text-md font-bold text-brand-success">
                Winner: <span className="text-white">{match.winner}</span>
              </p>
            </div>
          ))}
        </div>
      }
    />
  );
};

export default HeadToHead;
