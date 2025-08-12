import { useEffect, useState } from "react";
import { H2HDetails } from "../../../types/types";
import FetchStatus from "../../fetch-status/FetchStatus";
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
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (isShown) {
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
    }
  }, [homeTeamId, awayTeamId, isShown]);

  if (loading && isShown)
    return (
      <PreDisplay
        title="Head to Head"
        titleClass="text-brand-yellow font-semibold flex-grow text-2xl font-bold"
        expanded={isShown}
        setExpanded={setIsShown}
        child={<FetchStatus type="loading" message="Loading Data..." />}
      />
    );

  if (!loading && data.length === 0 && isShown) {
    return (
      <PreDisplay
        title="Head to Head"
        titleClass="text-brand-yellow  font-semibold flex-grow text-2xl font-bold"
        expanded={isShown}
        setExpanded={setIsShown}
        child={
          <FetchStatus type="info" message="No head to head data available." />
        }
      />
    );
  }

  return (
    <PreDisplay
      title="Head to Head"
      titleClass="text-brand-yellow  font-semibold flex-grow text-2xl font-bold"
      expanded={isShown}
      setExpanded={setIsShown}
      child={
        <div className="w-full flex flex-col gap-4">
          {data.map((match, index) => (
            <div
              key={index}
              className="bg-brand-card rounded-xl p-4 sm:p-5 flex flex-col gap-4 w-full"
            >
              <div className="flex flex-col gap-4 text-sm sm:text-base text-center">
                <div className="space-y-1">
                  <p>
                    <span className="text-brand-yellow font-semibold m-2">
                      Date:
                    </span>{" "}
                    {new Date(match.date).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="text-brand-yellow font-semibold m-2">
                      Venue:
                    </span>{" "}
                    {match.venue.name}
                  </p>
                  <p>
                    <span className="text-brand-yellow font-semibold m-2">
                      League:
                    </span>{" "}
                    {match.leagueName}
                  </p>
                  <p>
                    <span className="text-brand-yellow font-semibold m-2">
                      Season:
                    </span>{" "}
                    {match.season}
                  </p>
                  {match.round && (
                    <p>
                      <span className="text-brand-yellow font-semibold m-2">
                        Round:
                      </span>{" "}
                      {match.round}
                    </p>
                  )}
                </div>

                <div className="space-y-1 text-brand-white">
                  <p>
                    <span className="text-brand-lightGray font-medium m-2">
                      Half Time:
                    </span>{" "}
                    {match.homeHalfTimeGoal} - {match.awayHalfTimeGoal}
                  </p>
                  <p>
                    <span className="text-brand-lightGray font-medium m-2">
                      Full Time:
                    </span>{" "}
                    {match.homeFullTimeGoal} - {match.awayFullTimeGoal}
                  </p>
                  <p>
                    <span className="text-brand-lightGray font-medium m-2">
                      Extra Time:
                    </span>{" "}
                    {match.homeExtraTimeGoal} - {match.awayExtraTimeGoal}
                  </p>
                  <p>
                    <span className="text-brand-lightGray font-medium m-2 ">
                      Penalties:
                    </span>{" "}
                    {match.homePenalty} - {match.awayPenalty}
                  </p>
                </div>

                <div className="text-lg font-bold text-brand-success text-center ">
                  Winner: <span className="text-white">{match.winner}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
};

export default HeadToHead;
