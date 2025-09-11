import { useEffect, useState } from "react";
import { TeamForm } from "../../../../types/types";
import NoData from "../../../no-data/NoData";
import { ApiService } from "../../../../services/apiService";
import PreDisplay from "../../../pre-display/PreDisplay";

interface LastFiveMatchesProps {
  homeTeamId: number;
  homeTeam: string;
  awayTeamId: number;
  awayTeam: string;
  apiService: ApiService;
}

const LastFiveMatches = ({
  apiService,
  homeTeamId,
  homeTeam,
  awayTeamId,
  awayTeam,
}: LastFiveMatchesProps) => {
  const [homeTeamData, setHomeTeamData] = useState<string[]>([]);
  const [awayTeamData, setAwayTeamData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const colorMap: Record<string, string> = {
    W: "bg-brand-green",
    D: "bg-brand-yellow",
    L: "bg-brand-red",
  };

  const fetchData = () => {
    setLoading(true);
    apiService
      .fetchLastFiveMatches(homeTeamId, awayTeamId)
      .then((result: TeamForm) => {
        const { homeTeamLastFive, awayTeamLastFive } = result;
        setHomeTeamData(homeTeamLastFive);
        setAwayTeamData(awayTeamLastFive);
      })
      .catch(() => {
        setHomeTeamData([]);
        setAwayTeamData([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [homeTeamId, awayTeamId]);

  if (loading)
    return (
      <PreDisplay
        title="Last Five Results"
        onRefresh={fetchData}
        titleClass="text-brand-white font-semibold text-lg font-bold"
        child={<NoData displayedMessage="Fetching Last Five Matches." />}
      />
    );

  if (!loading && homeTeamData.length === 0 && awayTeamData.length === 0)
    return (
      <PreDisplay
        title="Last Five Results"
        onRefresh={fetchData}
        titleClass="text-brand-white font-semibold text-lg font-bold"
        child={
          <NoData displayedMessage="Last Five Matches results are not available." />
        }
      />
    );

  return (
    <PreDisplay
      title="Last Five Results"
      onRefresh={fetchData}
      titleClass="text-brand-white font-semibold text-lg font-bold"
      child={
        <div className="container flex w-full">
          <ul className="flex flex-col">
            <li className="flex flex-col mb-2">
              <div className="select-none cursor-pointer rounded-md flex flex-col transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                <div className="flex mb-4 flex-wrap">
                  <div className="flex flex-wrap items-center justify-center rounded-md w-8 h-8 bg-brand-royalblue">
                    ⚽️
                  </div>
                  <span className="text-sm m-2 text-brand-orange">
                    {homeTeam}
                  </span>
                </div>
                <div className="flex flex-row">
                  <div className="font-medium flex flex-row">
                    {homeTeamData.length === 0 ? (
                      <span className="text-base text-white">
                        No data available
                      </span>
                    ) : (
                      homeTeamData.map((result, idx) => (
                        <span
                          key={idx}
                          className={`w-6 h-6 flex flex-wrap items-center justify-center font-roboto text-sm text-black ${colorMap[result]}`}
                        >
                          {result}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </li>
            <li className="flex flex-col mt-2 mb-2">
              <div className="select-none cursor-pointer rounded-md flex flex-col transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                <div className="flex mb-4 flex-wrap">
                  <div className="flex flex-wrap items-center justify-center rounded-md w-8 h-8 bg-brand-royalblue">
                    ⚽️
                  </div>
                  <span className="text-sm m-2 text-brand-orange">
                    {awayTeam}
                  </span>
                </div>
                <div className="flex flex-row">
                  <div className="font-medium flex flex-row">
                    {homeTeamData.length === 0 ? (
                      <span className="text-base text-white">
                        No data available
                      </span>
                    ) : (
                      awayTeamData.map((result, idx) => (
                        <span
                          key={idx}
                          className={`w-6 h-6 flex flex-wrap items-center justify-center font-roboto text-sm text-black ${colorMap[result]}`}
                        >
                          {result}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      }
    />
  );
};

export default LastFiveMatches;
