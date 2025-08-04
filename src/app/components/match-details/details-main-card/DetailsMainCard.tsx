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
    <div className="bg-brand-card p-10 rounded-2xl shadow-xl w-full h-full flex flex-col justify-between">
      <div className="flex flex-col lg:flex-row justify-between gap-10 flex-grow">
        <div className="w-full lg:w-2/3 space-y-8 text-left">
          <DetailsHeader homeTeam={homeTeam} awayTeam={awayTeam} />

          <Link
            to={`/league/${league.id}`}
            data-testid="league-link"
            className="inline-block text-xl lg:text-2xl text-brand-white hover:text-brand-orange hover:underline transition duration-300 mt-3"
          >
            <span className="flex items-center gap-3 whitespace-normal">
              🏆 {league?.id ? league.name : "Unknown League"} &mdash;{" "}
              {league.round}
              <span className="text-brand-orange text-3xl ml-2">&rarr;</span>
            </span>
          </Link>

          <p className="text-brand-lightGray text-lg lg:text-xl mt-6">
            📍 {venue.name}, {venue.city}
          </p>

          <p className="text-brand-yellow text-lg lg:text-xl mt-4">
            📅 {new Date(date).toLocaleString()}
          </p>
        </div>

        <div className="w-full lg:w-1/3 flex items-left justify-start text-left">
          <p className="text-5xl font-extrabold text-brand-white leading-none">
            {goals.home ?? "-"} : {goals.away ?? "-"}
          </p>
          <p className="text-brand-white text-xl m-3">
            {score.fulltime?.home != null && "FT"}
          </p>
        </div>
      </div>
    </div>
  );
};
