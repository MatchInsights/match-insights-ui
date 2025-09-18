import { useEffect, useState } from "react";
import { TwoTeamStats } from "../../../../types/types";
import { ApiService } from "../../../../services/apiService";
import PreDisplay from "../../../pre-display/PreDisplay";
import NoData from "../../../no-data/NoData";

interface TeamStatsProps {
  title: string;
  homeTeamId: number;
  awayTeamId: number;
  homeTeamName: string;
  awayTeamName: string;
  apiService: ApiService;
}

export default function H2hStats({
  title,
  homeTeamId,
  awayTeamId,
  homeTeamName,
  awayTeamName,
  apiService,
}: TeamStatsProps) {
  const [stats, setStats] = useState<TwoTeamStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);

    apiService
      .fetchH2HStats(homeTeamId, awayTeamId)
      .then((result) => setStats(result))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [homeTeamId, awayTeamId]);

  if (loading)
    return (
      <PreDisplay
        title={title}
        titleClass="text-brand-yellow font-semibold text-lg font-bold"
        onRefresh={fetchData}
        child={<NoData displayedMessage="Fetching H2H Stats." />}
      />
    );

  if (!loading && !stats)
    return (
      <PreDisplay
        title={title}
        titleClass="text-brand-white font-semibold text-lg font-bold"
        onRefresh={fetchData}
        child={<NoData displayedMessage="Failed Fetching H2H Stats." />}
      />
    );

  const getCategories = () => {
    const twoTeamStats: TwoTeamStats = stats as TwoTeamStats;
    return [
      {
        icon: "⚽️",
        label: "Goals For",
        labelId: 0,
        home: twoTeamStats.team0.goalsFor,
        away: twoTeamStats.team1.goalsFor,
        bg: "bg-brand-royalblue",
      },
      {
        icon: "💀",
        labelId: 1,
        label: "Goals Against",
        home: twoTeamStats.team0.goalsAgainst,
        away: twoTeamStats.team1.goalsAgainst,
        bg: "bg-brand-red",
      },
      {
        icon: "🛡️",
        label: "Clean Sheet",
        labelId: 2,
        home: twoTeamStats.team0.cleanSheet,
        away: twoTeamStats.team1.cleanSheet,
        bg: "bg-brand-royalblue",
      },
      {
        icon: "⚽️",
        label: "Scored In",
        labelId: 3,
        home: twoTeamStats.team0.scoredIn,
        away: twoTeamStats.team1.scoredIn,
        bg: "bg-brand-royalblue",
      },
      {
        icon: "💀",
        label: "Conceded In",
        labelId: 4,
        home: twoTeamStats.team0.concededIn,
        away: twoTeamStats.team1.concededIn,
        bg: "bg-brand-red",
      },
    ];
  };

  const homeAwaySimbol = (home: number, away: number): string => {
    if (home === away) return "=";
    if (home > away) return ">";
    return "<";
  };

  return (
    <PreDisplay
      title={title}
      titleClass="text-brand-white font-semibold text-lg font-bold"
      onRefresh={fetchData}
      child={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getCategories().map(({ label, home, away, icon, bg, labelId }) => (
            <div
              key={labelId}
              className="flex flex-col gap-2 text-brand-yellow font-bold text-md"
            >
              <div
                data-testid={`stat-label-${labelId}`}
                className="flex items-center gap-2 text-sm font-semibold text-brand-white"
              >
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 rounded-md ${bg}`}
                >
                  {icon}
                </span>
                {label}
              </div>

              <div
                data-testid={`stat-data-${labelId}`}
                className="flex flex-col gap-1 text-sm text-left text-brand-white"
              >
                <p className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-brand-green uppercase leading-5">
                    {homeTeamName}
                  </span>
                  <span className="text-xs font-semibold text-brand-red uppercase leading-5">
                    {homeAwaySimbol(home, away)}
                  </span>
                  <span className="text-xs font-semibold text-brand-green uppercase leading-5">
                    {awayTeamName}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
}
