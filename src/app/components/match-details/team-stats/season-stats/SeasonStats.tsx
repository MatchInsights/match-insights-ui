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
  leagueId: number;
  apiService: ApiService;
}

export default function SeasonStats({
  title,
  homeTeamId,
  awayTeamId,
  leagueId,
  homeTeamName,
  awayTeamName,
  apiService,
}: TeamStatsProps) {
  const [stats, setStats] = useState<TwoTeamStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    apiService
      .fetchSeasonStats(homeTeamId, awayTeamId, leagueId)
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
        child={<NoData displayedMessage="Fetching Season Stats." />}
      />
    );

  if (!loading && !stats)
    return (
      <PreDisplay
        title={title}
        titleClass="text-brand-white font-semibold text-lg font-bold"
        onRefresh={fetchData}
        child={<NoData displayedMessage="Failed Fetching Season Stats." />}
      />
    );

  const categories = () => {
    const seasonStats: TwoTeamStats = stats as TwoTeamStats;

    return [
      {
        icon: "⚽️",
        label: "Goals For",
        labelId: 0,
        home: seasonStats.team0.goalsFor,
        away: seasonStats.team1.goalsFor,
        bg: "bg-brand-royalblue",
      },
      {
        icon: "💀",
        label: "Goals Against",
        labelId: 1,
        home: seasonStats.team0.goalsAgainst,
        away: seasonStats.team1.goalsAgainst,
        bg: "bg-brand-red",
      },
      {
        icon: "🛡️",
        label: "Clean Sheet",
        labelId: 2,
        home: seasonStats.team0.cleanSheet,
        away: seasonStats.team1.cleanSheet,
        bg: "bg-brand-royalblue",
      },
      {
        icon: "⚽️",
        label: "Scored In",
        labelId: 3,
        home: seasonStats.team0.scoredIn,
        away: seasonStats.team1.scoredIn,
        bg: "bg-brand-royalblue",
      },
      {
        icon: "💀",
        label: "Conceded In",
        labelId: 4,
        home: seasonStats.team0.concededIn,
        away: seasonStats.team1.concededIn,
        bg: "bg-brand-red",
      },
    ];
  };

  return (
    <PreDisplay
      title={title}
      titleClass="text-brand-white font-semibold text-lg font-bold"
      onRefresh={fetchData}
      child={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories().map(({ icon, label, labelId, home, away, bg }) => (
            <div
              data-testid={`stat-label-${labelId}`}
              key={labelId}
              className="flex flex-col gap-1"
            >
              <ul className="list-none p-0 m-0">
                <li className="flex items-center gap-2 text-sm font-semibold text-brand-white">
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded-md ${bg}`}
                  >
                    {icon}
                  </span>
                  <span>{label}</span>
                </li>
              </ul>

              <div
                data-testid={`stat-data-${labelId}`}
                className="flex flex-col text-sm text-left text-brand-white"
              >
                <p>
                  <span className="text-xs font-semibold text-brand-green uppercase leading-5">
                    {homeTeamName}:
                  </span>{" "}
                  <span className="text-xs text-brand-white">{home}</span>
                </p>
                <p>
                  <span className="text-xs font-semibold text-brand-green uppercase leading-5">
                    {awayTeamName}:
                  </span>{" "}
                  <span className="text-xs text-brand-white">{away}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
}
