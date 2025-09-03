import { useEffect, useState } from "react";
import NoData from "../../../no-data/NoData";
import PreDisplay from "../../../pre-display/PreDisplay";
import { ApiService } from "../../../../services/apiService";

import { FaFutbol, FaSquare, FaSquareFull } from "react-icons/fa";
import { LastFiveMatchesEvents } from "../../../../types/types";

interface Props {
  title: string;
  teamId: number;
  apiService: ApiService;
}

const MatchEvents = ({ title, teamId, apiService }: Props) => {
  const [details, setDetails] = useState<LastFiveMatchesEvents | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    apiService
      .fetchLastFiveMatchesEvents(teamId)
      .then((data: LastFiveMatchesEvents) => setDetails(data))
      .catch(() => setDetails(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [teamId, apiService]);

  if (loading)
    return (
      <PreDisplay
        title={title}
        titleClass="text-brand-orange font-semibold text-lg font-bold"
        onRefresh={fetchData}
        child={<NoData displayedMessage="Fetching Previous Matches info." />}
      />
    );

  if (!loading && !details)
    return (
      <PreDisplay
        title={title}
        titleClass="text-brand-orange font-semibold text-lg font-bold"
        onRefresh={fetchData}
        child={
          <NoData displayedMessage="Failed Fetching Previous Matches info." />
        }
      />
    );

  return (
    <PreDisplay
      title={title}
      titleClass="text-brand-orange font-semibold text-lg font-bold"
      onRefresh={fetchData}
      child={
        <div className="w-full flex flex-col gap-6">
          <div>
            <h3 className="text-brand-yellow m-2 font-semibold text-md flex items-left gap-2">
              <FaFutbol className="text-brand-orange" /> Goals
            </h3>
            <div className="flex flex-col gap-2 text-sm text-brand-white">
              <p>
                First Half:{" "}
                <span className="text-brand-orange">
                  {details?.firstHalfGoals}
                </span>
              </p>
              <p>
                Second Half:{" "}
                <span className="text-brand-orange">
                  {details?.secondHalfGoals}
                </span>
              </p>
              <p>
                Extra Time:{" "}
                <span className="text-brand-orange">
                  {details?.extraTimeGoals}
                </span>
              </p>
              <p>
                Penalties:{" "}
                <span className="text-brand-orange">{details?.penalties}</span>
              </p>
            </div>
          </div>

          <div data-testid="goals-data">
            <h3 className="text-brand-yellow font-semibold text-md m-2 flex items-left gap-2">
              <FaSquare className="text-brand-yellow" /> Yellow Cards
            </h3>
            <div className="flex flex-col gap-2 text-sm text-brand-white">
              <p>
                First Half:{" "}
                <span className="text-brand-orange">
                  {details?.firstHalfYellowCards}
                </span>
              </p>
              <p>
                Second Half:{" "}
                <span className="text-brand-orange">
                  {details?.secondHalfYellowCards}
                </span>
              </p>
              <p>
                Extra Time:{" "}
                <span className="text-brand-orange">
                  {details?.extraTimeYellowCards}
                </span>
              </p>
            </div>
          </div>

          <div data-testid="cards-data">
            <h3 className="text-brand-yellow font-semibold text-md m-2 flex items-left gap-2">
              <FaSquareFull className="text-brand-danger" /> Red Cards
            </h3>
            <div className="flex flex-col gap-2 text-sm text-brand-white">
              <p>
                First Half:{" "}
                <span className="text-brand-orange">
                  {details?.firstHalfRedCards}
                </span>
              </p>
              <p>
                Second Half:{" "}
                <span className="text-brand-orange">
                  {details?.secondHalfRedCards}
                </span>
              </p>
              <p>
                Extra Time:{" "}
                <span className="text-brand-orange">
                  {details?.extraTimeRedCards}
                </span>
              </p>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default MatchEvents;
