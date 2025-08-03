import { Goal, League, Score, Team, Venue } from "../../../types/types";
import DetailsHeader from "./details-header/DetailsHeader";
import { Link } from "react-router-dom";

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
    <div className="bg-brand-card p-6 md:p-8 rounded-2xl shadow-xl w-full">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full md:w-3/4 space-y-2 text-left">
          <DetailsHeader homeTeam={homeTeam} awayTeam={awayTeam} />
          <Link
            to={`/league/${league.id}`}
            data-testid="league-link"
            className="block text-base md:text-lg text-brand-lightGray hover:text-brand-orange hover:underline transition duration-200"
          >
            🏆 {league?.id ? league.name : "Unknown League"} &mdash;{" "}
            {league.round}{" "}
            <span className="text-brand-orange text-1xl ml-1">&rarr;</span>
          </Link>
          <p className="text-brand-lightGray text-base md:text-lg mt-1">
            📍 {venue.name}, {venue.city}
          </p>
          <p className="text-brand-yellow text-base md:text-lg mt-1">
            📅 {new Date(date).toLocaleString()}
          </p>
        </div>

        <div className="w-full md:w-1/4 text-center">
          <p className="text-3xl font-extrabold text-brand-white">
            {goals.home ?? "-"} : {goals.away ?? "-"}
          </p>
          <p className="text-brand-white text-base mt-2">
            {score.fulltime?.home != null ? "FT" : "Scheduled"}
          </p>
        </div>
      </div>
    </div>
  );
};
