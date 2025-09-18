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
        titleClass="text-brand-white font-semibold text-lg font-bold"
        onRefresh={fetchData}
        child={<NoData displayedMessage="H2H Info is not available." />}
      />
    );
  }

  return (
    <PreDisplay
      title="Head to Head"
      titleClass="text-brand-white font-semibold text-lg font-bold"
      onRefresh={fetchData}
      child={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((match, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 p-4 text-xs font-semibold text-brand-white uppercase leading-5 "
            >
              <p>
                <span className="text-xs font-semibold text-brand-yellow uppercase leading-5">Date:</span>{" "}
                {new Date(match.date).toLocaleDateString()}
              </p>
              <p>
                <span className="text-xs font-semibold text-brand-yellow uppercase leading-5">Venue:</span>{" "}
                {match.venue.name}
              </p>
              <p>
                <span className="text-xs font-semibold text-brand-yellow uppercase leading-5">League:</span>{" "}
                {match.leagueName}
              </p>
              <p>
                <span className="text-xs font-semibold text-brand-yellow uppercase leading-5">Season:</span>{" "}
                {match.season}
              </p>
              {match.round && (
                <p>
                  <span className="text-xs font-semibold text-brand-yellow uppercase leading-5">Round:</span>{" "}
                  {match.round}
                </p>
              )}

              <p>
                <span className="text-xs font-semibold text-brand-lightGray uppercase leading-5">
                  Half Time:
                </span>{" "}
                {match.homeHalfTimeGoal} - {match.awayHalfTimeGoal}
              </p>
              <p>
                <span className="text-xs font-semibold text-brand-lightGray uppercase leading-5">
                  Full Time:
                </span>{" "}
                {match.homeFullTimeGoal} - {match.awayFullTimeGoal}
              </p>
              <p>
                <span className="text-xs font-semibold text-brand-lightGray uppercase leading-5">
                  Extra Time:
                </span>{" "}
                {match.homeExtraTimeGoal} - {match.awayExtraTimeGoal}
              </p>
              <p>
                <span className="text-xs font-semibold text-brand-lightGray uppercase leading-5">
                  Penalties:
                </span>{" "}
                {match.homePenalty} - {match.awayPenalty}
              </p>

              <p className="text-xs font-semibold text-brand-success uppercase leading-5">
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
