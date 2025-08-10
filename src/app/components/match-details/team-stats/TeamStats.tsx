import { useEffect, useState } from "react";
import { TwoTeamStats } from "../../../types/types";
import FetchStatus from "../../fetch-status/FetchStatus";
import { ApiService } from "../../../services/apiService";
import PreDisplay from "../../pre-display/PreDisplay";

interface TeamStatsProps {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamName: string;
  awayTeamName: string;
  leagueId?: number;
  apiService: ApiService;
}

export default function TeamStats({
  homeTeamId,
  awayTeamId,
  leagueId,
  homeTeamName,
  awayTeamName,
  apiService,
}: TeamStatsProps) {
  const [stats, setStats] = useState<TwoTeamStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (!leagueId && isShown) {
      setLoading(true);
      apiService
        .fetchH2HStats(homeTeamId, awayTeamId)
        .then((result) => {
          setStats(result);
        })
        .catch(() => {
          setStats(null);
        })
        .finally(() => setLoading(false));
    }

    if (leagueId && isShown) {
      setLoading(true);
      apiService
        .fetchSeasonStats(homeTeamId, awayTeamId, leagueId)
        .then((result) => {
          setStats(result);
        })
        .catch(() => {
          setStats(null);
        })
        .finally(() => setLoading(false));
    }
  }, [homeTeamId, awayTeamId, isShown]);

  if (loading && isShown)
    return (
      <PreDisplay
        title={!leagueId ? "H2H Stats" : "Season Stats"}
        titleClass="text-brand-yellow font-semibold flex-grow text-2xl font-bold"
        expanded={isShown}
        setExpanded={setIsShown}
        child={<FetchStatus type="loading" message="Loading Data..." />}
      />
    );

  if (!loading && !stats && isShown)
    return (
      <PreDisplay
        title={!leagueId ? "H2H Stats" : "Season Stats"}
        titleClass="text-brand-yellow font-semibold flex-grow text-2xl font-bold"
        expanded={isShown}
        setExpanded={setIsShown}
        child={<FetchStatus type="info" message="No Stats data available." />}
      />
    );

  const categories = [
    {
      label: "Avg Goals For",
      home: stats?.team0.avgGoalsFor,
      away: stats?.team1.avgGoalsFor,
    },
    {
      label: "Avg Goals Against",
      home: stats?.team0.avgGoalsAgainst,
      away: stats?.team1.avgGoalsAgainst,
    },
    {
      label: "Clean Sheet %",
      home: stats?.team0.cleanSheetPercent,
      away: stats?.team1.cleanSheetPercent,
    },
    {
      label: "Scored In %",
      home: stats?.team0.scoredInPercent,
      away: stats?.team1.scoredInPercent,
    },
    {
      label: "Conceded In %",
      home: stats?.team0.concededInPercent,
      away: stats?.team1.concededInPercent,
    },
  ];

  const renderBar = (value: number) => (
    <div className="w-full bg-brand-card h-3 rounded">
      <div
        className="h-3 rounded"
        style={{
          width: `${value}%`,
          backgroundColor: value >= 50 ? "#00C853" : "#D50000",
        }}
      ></div>
    </div>
  );

  return (
    <PreDisplay
      title={!leagueId ? "H2H Stats" : "Season Stats"}
      titleClass="text-brand-yellow font-semibold flex-grow text-2xl font-bold"
      expanded={isShown}
      setExpanded={setIsShown}
      child={
        <div className="bg-brand-navbar p-6 md:p-10 rounded-2xl shadow-md w-full">
          <div className="flex flex-col space-y-8">
            {categories.map(({ label, home, away }) => (
              <div key={label}>
                <p className="text-brand-lightGray m-4  text-lg text-center font-medium">
                  {label}
                </p>

                <div className="flex flex-col mt-4 sm:flex-row sm:items-center gap-3 sm:gap-6">
                  <div className="sm:w-1/3 text-lg  mt-3 text-white font-semibold">
                    {homeTeamName}: {home}
                  </div>
                  <div className="sm:w-2/3 mt-3">{renderBar(home ?? 0)}</div>
                </div>

                <div className="flex flex-col mt-4 sm:flex-row sm:items-center gap-3 sm:gap-6 mt-3">
                  <div className="sm:w-1/3 text-lg mt-3  text-white font-semibold">
                    {awayTeamName}: {away}
                  </div>
                  <div className="sm:w-2/3 mt-3">{renderBar(away ?? 0)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    />
  );
}
