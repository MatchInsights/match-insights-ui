import { useEffect, useState } from "react";
import { ApiService } from "../../../services/apiService";
import {
  Goal,
  League,
  Score,
  Team,
  TeamPositionsAndPoints,
  Venue,
} from "../../../types/types";
import DetailsHeader from "./details-header/DetailsHeader";
import { Link } from "react-router-dom";
import FetchStatus from "../../fetch-status/FetchStatus";

interface DetailsMainCardProps {
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  league: League;
  venue: Venue;
  goals: Goal;
  score: Score;
  apiService: ApiService;
}

export const DetailsMainCard = ({
  homeTeam,
  awayTeam,
  date,
  league,
  venue,
  goals,
  score,
  apiService,
}: DetailsMainCardProps) => {
  const [teamsLeagueStats, setTeamsLeagueStats] =
    useState<TeamPositionsAndPoints | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!league.id) {
      setLoading(false);
      setTeamsLeagueStats(null);
    } else {
      apiService
        .fetchTeamLeagueStats(homeTeam.id, awayTeam.id, league.id)
        .then((details) => {
          setTeamsLeagueStats(details);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setTeamsLeagueStats(null);
        });
    }
  }, [homeTeam.id, awayTeam.id, league.id]);

  if (loading)
    return <FetchStatus type="loading" message="Loading League Stats..." />;

  return (
    <div className="bg-brand-card p-4 md:p-10 rounded-2xl shadow-xl w-full h-full flex flex-col gap-6">
      <DetailsHeader homeTeam={homeTeam} awayTeam={awayTeam} />

      <div className="flex flex-col lg:flex-row flex-grow gap-6 w-full">
        <div className="flex flex-col justify-between flex-1 space-y-4">
          <Link
            data-testid="league-link"
            to={`/league/${league.id}`}
            className="text-2xl md:text-4xl lg:text-5xl text-brand-white hover:text-brand-orange hover:underline transition duration-300"
          >
            <span className="flex flex-wrap items-center gap-4">
              🏆 {league?.id ? league.name : "Unknown League"} &mdash;{" "}
              {league.round}
              <span className="text-brand-orange text-6xl ml-2">&rarr;</span>
            </span>
          </Link>

          <div className="space-y-2 mt-4">
            <p className="text-brand-lightGray text-xl md:text-2xl">
              📍 {venue.name}, {venue.city}
            </p>
            <p className="text-brand-yellow text-xl md:text-2xl">
              📅 {new Date(date).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center lg:items-end flex-1 space-y-6 text-center lg:text-right">
          <div>
            <p className="text-6xl font-extrabold text-brand-white leading-none">
              {goals.home ?? "-"} : {goals.away ?? "-"}
            </p>
            {score.fulltime?.home != null && (
              <p className="text-brand-white text-2xl mt-2">FT</p>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-xl md:text-2xl text-brand-lightGray">
              <span className="text-brand-yellow font-semibold">
                League Points:
              </span>{" "}
              {teamsLeagueStats?.homeTeamPoints ?? "-"} vs{" "}
              {teamsLeagueStats?.awayTeamPoints ?? "-"}
            </p>
            <p className="text-xl md:text-2xl text-brand-lightGray">
              <span className="text-brand-yellow font-semibold">
                League Ranks:
              </span>{" "}
              {teamsLeagueStats?.homeTeamPosition ?? "-"} vs{" "}
              {teamsLeagueStats?.awayTeamPosition ?? "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
