import { useEffect, useState } from "react";
import NoData from "../../../no-data/NoData";
import PreDisplay from "../../../pre-display/PreDisplay";
import { ApiService } from "../../../../services/apiService";

import {FaSquare, FaSquareFull } from "react-icons/fa";
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
        titleClass="text-brand-yellow font-semibold text-lg font-bold"
        onRefresh={fetchData}
        child={<NoData displayedMessage="Fetching Previous Matches info." />}
      />
    );

  if (!loading && !details)
    return (
      <PreDisplay
        title={title}
        titleClass="text-brand-white font-semibold text-lg font-bold"
        onRefresh={fetchData}
        child={
          <NoData displayedMessage="Failed Fetching Previous Matches info." />
        }
      />
    );

  return (
    <PreDisplay
      title={title}
      titleClass="text-brand-white font-semibold text-lg font-bold"
      onRefresh={fetchData}
      child={
        <div className="w-full flex flex-col gap-6">
          <div>
        <div className="flex mb-1 flex-wrap">
          <div className="flex flex-wrap items-center justify-center rounded-md w-6 h-6 bg-brand-royalblue">
            ⚽️ 
          </div>
          <span
            data-testid="grp-label"
            className="text-sm text-brand-white m-1 font-semibold text-md flex items-left gap-1"
          >
          Goals
          </span>
        </div>
            <div className="text-xs font-semibold text-brand-green uppercase leading-5">
              <p>
                First Half:{" "}
                <span className="text-brand-white">
                  {details?.firstHalfGoals}
                </span>
              </p>
              <p>
                Second Half:{" "}
                <span className="text-brand-white">
                  {details?.secondHalfGoals}
                </span>
              </p>
              <p>
                Extra Time:{" "}
                <span className="text-brand-white">
                  {details?.extraTimeGoals}
                </span>
              </p>
              <p>
                Penalties:{" "}
                <span className="text-brand-white">{details?.penalties}</span>
              </p>
            </div>
          </div>

          <div data-testid="goals-data">
            <h3 className="flex items-center text-sm text-brand-white font-semibold ml-0 mt-0 mb-1 gap-1">
              <FaSquare size={17} className="text-brand-yellow mr-1" /> Yellow Cards
            </h3>
            <div className="text-xs font-semibold text-brand-green uppercase leading-5">
              <p>
                First Half:{" "}
                <span className="text-brand-white">
                  {details?.firstHalfYellowCards}
                </span>
              </p>
              <p>
                Second Half:{" "}
                <span className="text-brand-white">
                  {details?.secondHalfYellowCards}
                </span>
              </p>
              <p>
                Extra Time:{" "}
                <span className="text-brand-white">
                  {details?.extraTimeYellowCards}
                </span>
              </p>
            </div>
          </div>

          <div data-testid="cards-data">
            <h3 className="flex items-center text-sm text-brand-white font-semibold ml-0 mt-0 mb-1 gap-1">
              <FaSquareFull size={15} className="text-brand-danger mr-1" /> Red Cards
            </h3>
            <div className="text-xs font-semibold text-brand-green uppercase leading-5">
              <p>
                First Half:{" "}
                <span className="text-brand-white">
                  {details?.firstHalfRedCards}
                </span>
              </p>
              <p>
                Second Half:{" "}
                <span className="text-brand-white">
                  {details?.secondHalfRedCards}
                </span>
              </p>
              <p>
                Extra Time:{" "}
                <span className="text-brand-white">
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
