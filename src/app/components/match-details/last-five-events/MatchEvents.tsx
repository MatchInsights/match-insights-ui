import { useEffect, useState } from "react";
import NoData from "../../no-data/NoData";
import PreDisplay from "../../pre-display/PreDisplay";
import { ApiService } from "../../../services/apiService";

import { FaFutbol, FaSquare, FaSquareFull } from "react-icons/fa";
import { LastFiveMatchesEvents } from "../../../types/types";

interface Props {
  title: string;
  teamId: number;
  apiService: ApiService;
}

const MatchEvents = ({ title, teamId, apiService }: Props) => {
  const [details, setDetails] = useState<LastFiveMatchesEvents | null>(null);
  const [loading, setLoading] = useState(false);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (isShown) {
      setLoading(true);
      apiService
        .fetchLastFiveMatchesEvents(teamId)
        .then((data: LastFiveMatchesEvents) => setDetails(data))
        .catch(() => setDetails(null))
        .finally(() => setLoading(false));
    }
  }, [isShown, teamId, apiService]);

  if (loading && isShown)
    return (
      <PreDisplay
        title={title}
        titleClass="text-brand-orange  font-semibold flex-grow text-2xl font-bold"
        expanded={isShown}
        setExpanded={setIsShown}
        child={<NoData />}
      />
    );

  if (!loading && !details && isShown)
    return (
      <PreDisplay
        title={title}
        titleClass="text-brand-orange  font-semibold flex-grow text-2xl font-bold"
        expanded={isShown}
        setExpanded={setIsShown}
        child={<NoData />}
      />
    );

  return (
    <PreDisplay
      title={title}
      titleClass="text-brand-orange  font-semibold flex-grow text-2xl font-bold"
      expanded={isShown}
      setExpanded={setIsShown}
      child={
        <div className="bg-brand-navbar p-6 md:p-8 rounded-2xl w-full flex flex-col gap-6">
          <div>
            <h3 className="text-brand-yellow font-semibold mb-2 text-2xl flex items-center gap-2">
              <FaFutbol className="text-brand-orange" /> Goals
            </h3>
            <div className="flex flex-col gap-1 text-left text-xl text-brand-white">
              <p>
                First Half:{" "}
                <span className="text-brand-orange m-2">
                  {details?.firstHalfGoals}
                </span>
              </p>
              <p>
                Second Half:{" "}
                <span className="text-brand-orange m-2">
                  {details?.secondHalfGoals}
                </span>
              </p>
              <p>
                Extra Time:{" "}
                <span className="text-brand-orange m-2">
                  {details?.extraTimeGoals}
                </span>
              </p>
              <p>
                Penalties:{" "}
                <span className="text-brand-orange m-2">
                  {details?.penalties}
                </span>
              </p>
            </div>
          </div>

          <div data-testid="goals-data">
            <h3 className="text-brand-yellow font-semibold text-2xl mb-2 flex items-center gap-2">
              <FaSquare className="text-yellow-400" /> Yellow Cards
            </h3>
            <div className="flex flex-col gap-1 text-left text-xl text-brand-white">
              <p>
                First Half:{" "}
                <span className="text-brand-orange m-2">
                  {details?.firstHalfYellowCards}
                </span>
              </p>
              <p>
                Second Half:{" "}
                <span className="text-brand-orange m-2">
                  {details?.secondHalfYellowCards}
                </span>
              </p>
              <p>
                Extra Time:{" "}
                <span className="text-brand-orange m-2">
                  {details?.extraTimeYellowCards}
                </span>
              </p>
            </div>
          </div>

          <div data-testid="cards-data">
            <h3 className="text-brand-yellow font-semibold text-2xl mb-2 flex items-center gap-2">
              <FaSquareFull className="text-red-600" /> Red Cards
            </h3>
            <div className="flex flex-col gap-1 text-left text-xl text-brand-white">
              <p>
                First Half:{" "}
                <span className="text-brand-orange m-2">
                  {details?.firstHalfRedCards}
                </span>
              </p>
              <p>
                Second Half:{" "}
                <span className="text-brand-orange m-2">
                  {details?.secondHalfRedCards}
                </span>
              </p>
              <p>
                Extra Time:{" "}
                <span className="text-brand-orange m-2">
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
