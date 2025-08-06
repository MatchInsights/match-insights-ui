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
    <div className="bg-brand-card p-6 md:p-10 rounded-2xl shadow-xl w-full h-full flex flex-col justify-between">
      <div className="flex flex-col lg:flex-row justify-between gap-10 flex-grow">
        <div className="w-full lg:w-2/3 space-y-6 text-center lg:text-left">
          <DetailsHeader homeTeam={homeTeam} awayTeam={awayTeam} />

          <Link
            to={`/league/${league.id}`}
            data-testid="league-link"
            className="inline-block text-2xl lg:text-3xl text-brand-white hover:text-brand-orange hover:underline transition duration-300"
          >
            <span className="flex flex-wrap justify-center lg:justify-start items-center gap-2">
              🏆 {league?.id ? league.name : "Unknown League"} &mdash;{" "}
              {league.round}
              <span className="text-brand-orange text-4xl ml-1">&rarr;</span>
            </span>
          </Link>

          <p className="text-brand-lightGray text-xl lg:text-2xl">
            📍 {venue.name}, {venue.city}
          </p>

          <p className="text-brand-yellow text-xl lg:text-2xl">
            📅 {new Date(date).toLocaleString()}
          </p>
        </div>

        <div className="w-full lg:w-1/3 flex items-center justify-center lg:items-start text-center lg:text-left">
          <p className="text-6xl font-extrabold text-brand-white leading-none">
            {goals.home ?? "-"} : {goals.away ?? "-"}
          </p>
          {score.fulltime?.home != null && (
            <p className="text-brand-white text-2xl m-4">FT</p>
          )}
        </div>
      </div>
    </div>
  );
};
