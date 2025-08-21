import { Goal, League, Score, Team, Venue } from "../../../types/types";

import { Link } from "react-router-dom";
import DetailsHeader from "./details-header/DetailsHeader";

interface DetailsMainCardProps {
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  league: League;
  venue: Venue;
  goals: Goal;
  score: Score;
}
export const DetailsMainCard = ({
  homeTeam,
  awayTeam,
  date,
  league,
  venue,
  goals,
  score,
}: DetailsMainCardProps) => {
  return (
    <div
      className="
        grid 
        grid-cols-1
        gap-4
        w-full 
        px-3
      "
      style={{ minHeight: "200px" }}
    >
      {homeTeam && awayTeam && (
        <div className="flex flex-col p-3 rounded-lg h-full space-y-4 bg-brand-dark">
          <DetailsHeader homeTeam={homeTeam} awayTeam={awayTeam} />

          <Link
            data-testid="league-link"
            to={`/league/${league.id}`}
            className="text-lg md:text-xl text-brand-white hover:text-brand-orange hover:underline transition duration-300"
          >
            <span className="flex flex-wrap items-center gap-1">
              🏆 {league?.id ? league.name : "Unknown League"} — {league.round}
              <span className="text-brand-orange text-sm ml-1">&rarr;</span>
            </span>
          </Link>

          <div className="text-sm space-y-1">
            <p className="text-brand-lightGray">
              📍 {venue.name}, {venue.city}
            </p>
            <p className="text-brand-yellow">
              📅 {new Date(date).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-4xl font-extrabold text-brand-white leading-none">
              {goals.home ?? "-"} : {goals.away ?? "-"}
              {score.fulltime?.home != null && (
                <span className="text-brand-white text-base ml-3">FT</span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
