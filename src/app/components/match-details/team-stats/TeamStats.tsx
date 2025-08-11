import { useEffect, useState } from "react";
import { TwoTeamStats } from "../../../types/types";
import FetchStatus from "../../fetch-status/FetchStatus";
import { ApiService } from "../../../services/apiService";
import PreDisplay from "../../pre-display/PreDisplay";
import { FaFutbol, FaShieldAlt, FaSkull } from "react-icons/fa";

interface TeamStatsProps {
  title: string;
  homeTeamId: number;
  awayTeamId: number;
  homeTeamName: string;
  awayTeamName: string;
  leagueId?: number;
  apiService: ApiService;
}

export default function TeamStats({
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
        title={title}
        titleClass="text-brand-yellow font-semibold flex-grow text-2xl font-bold"
        expanded={isShown}
        setExpanded={setIsShown}
        child={<FetchStatus type="loading" message="Loading Data..." />}
      />
    );

  if (!loading && !stats && isShown)
    return (
      <PreDisplay
        title={title}
        titleClass="text-brand-yellow font-semibold flex-grow text-2xl font-bold"
        expanded={isShown}
        setExpanded={setIsShown}
        child={<FetchStatus type="info" message="No Stats data available." />}
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

  return (
    <PreDisplay
      title={!leagueId ? "H2H Stats" : "Season Stats"}
      titleClass="text-brand-yellow font-semibold flex-grow text-2xl font-bold"
      expanded={isShown}
      setExpanded={setIsShown}
      child={
        <div className="w-full flex flex-col gap-4">
          {categories.map(({ label, home, away, icon }, index) => (
            <div
              key={index}
              className="bg-brand-card rounded-xl p-4 sm:p-5 flex flex-col gap-4 w-full"
            >
              <div className="flex items-center gap-2 text-brand-yellow font-bold text-lg sm:text-xl">
                <span className="text-brand-orange text-2xl m-2">{icon}</span>
                {label}
              </div>

              <div className="flex flex-col gap-2 text-sm sm:text-base text-center text-brand-white">
                <p>
                  <span className="text-brand-white text-1xl md:text-2xl font-semibold">
                    {homeTeamName}:
                  </span>{" "}
                  <span className="text-brand-orange text-2xl font-bold m-2">
                    {home}
                  </span>
                </p>

                <p>
                  <span className="text-brand-white text-1xl md:text-2xl font-semibold">
                    {awayTeamName}:
                  </span>{" "}
                  <span className="text-brand-orange text-2xl font-bold m-2">
                    {away}
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
