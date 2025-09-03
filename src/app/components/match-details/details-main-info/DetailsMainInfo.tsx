import { Goal, League, Score, Team, Venue } from "../../../types/types";
import { Link } from "react-router-dom";
import DetailsHeader from "./details-header/DetailsHeader";
import { BallAnimation } from "../../ball-animation/BallAnimation";

interface DetailsMainInfoProps {
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  league: League;
  venue: Venue;
  goals: Goal;
  score: Score;
}

export const DetailsMainInfo = ({
  homeTeam,
  awayTeam,
  date,
  league,
  venue,
  goals,
  score,
}: DetailsMainInfoProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 mx-4 gap-4">
      <BallAnimation isSubHeader={false} />

      <div className="flex flex-col items-center justify-center text-center p-4 gap-4 w-full">
        <DetailsHeader homeTeam={homeTeam} awayTeam={awayTeam} />

        <Link
          data-testid="league-link"
          to={`/league/${league.id}`}
          className="text-base text-brand-white hover:text-brand-orange hover:underline transition"
        >
          🏆 {league?.id ? league.name : "Unknown League"}
        </Link>

        <div className="text-sm">
          {venue.name && venue.city && (
            <p className="text-brand-lightGray">
              📍 {venue.name}, {venue.city}
            </p>
          )}

          <p className="text-brand-yellow m-2">
            📅 {new Date(date).toLocaleString()}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 m-2">
          <div>
            <p className="text-2xl font-extrabold text-brand-white leading-none">
              {goals.home ?? "-"} : {goals.away ?? "-"}
            </p>
          </div>

          <div>
            <p className="text-brand-orange font-semibold">HT</p>
            <p className="text-sm font-bold">
              {score.halftime?.home ?? "-"} : {score.halftime?.away ?? "-"}
            </p>
          </div>

          <div>
            <p className="text-brand-orange font-semibold">FT</p>
            <p className="text-sm font-bold">
              {score.fulltime?.home ?? "-"} : {score.fulltime?.away ?? "-"}
            </p>
          </div>
        </div>
      </div>
      <BallAnimation isSubHeader={false} />
    </div>
  );
};
