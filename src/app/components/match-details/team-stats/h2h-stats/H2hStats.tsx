import { useEffect, useState } from "react";
import { TwoTeamStats } from "../../../../types/types";
import { ApiService } from "../../../../services/apiService";
import PreDisplay from "../../../pre-display/PreDisplay";
import { FaFutbol, FaShieldAlt, FaSkull } from "react-icons/fa";
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
      .then((result) => {
        setStats(result);
      })
      .catch(() => {
        setStats(null);
      })
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
        titleClass="text-brand-yellow font-semibold text-lg font-bold"
        onRefresh={fetchData}
        child={<NoData displayedMessage="Failed Fetching H2H Stats." />}
      />
    );

  const categories = [
    {
      icon: <FaFutbol className="text-brand-orange" />,
      label: "Goals For",
      home: stats?.team0.goalsFor,
      away: stats?.team1.goalsFor,
    },
    {
      icon: <FaSkull className="text-brand-orange" />,
      label: "Goals Against",
      home: stats?.team0.goalsAgainst,
      away: stats?.team1.goalsAgainst,
    },
    {
      icon: <FaShieldAlt className="text-brand-orange" />,
      label: "Clean Sheet",
      home: stats?.team0.cleanSheet,
      away: stats?.team1.cleanSheet,
    },
    {
      icon: <FaFutbol className="text-brand-orange" />,
      label: "Scored In",
      home: stats?.team0.scoredIn,
      away: stats?.team1.scoredIn,
    },
    {
      icon: <FaSkull className="text-brand-orange" />,
      label: "Conceded In",
      home: stats?.team0.concededIn,
      away: stats?.team1.concededIn,
    },
  ];

  const homeAwaySimbol = (home: number, away: number): string => {
    if (home === away) {
      return "=";
    }
    if (home > away) {
      return ">";
    }
    return "<";
  };

  return (
    <PreDisplay
      title={title}
      titleClass="text-brand-yellow font-semibold text-lg font-bold"
      onRefresh={fetchData}
      child={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(({ label, home, away, icon }, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 text-brand-yellow font-bold text-md"
            >
              <div
                data-testid="stat-label"
                className="flex flex-wrap gap-2 text-brand-yellow font-bold text-md"
              >
                <span className="text-brand-orange m-2">{icon}</span>
                {label}
              </div>

              <div
                data-testid="home-away-stats"
                className="flex flex-col gap-2 text-sm text-left text-brand-white"
              >
                {(home === undefined ||
                  home === null ||
                  away === undefined ||
                  away === null) && <p>Unknown</p>}

                {home !== null &&
                  home !== undefined &&
                  away !== null &&
                  away !== undefined && (
                    <p>
                      <span className="text-brand-white  font-semibold">
                        {homeTeamName}
                      </span>{" "}
                      <span className="text-brand-orange  font-bold m-2">
                        {homeAwaySimbol(home, away)}
                      </span>
                      <span className="text-brand-white font-semibold">
                        {awayTeamName}
                      </span>{" "}
                    </p>
                  )}
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
}
