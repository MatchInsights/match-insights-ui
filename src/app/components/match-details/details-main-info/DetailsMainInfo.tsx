import { Goal, League, Score, Team, Venue } from "../../../types/types";
import { Link } from "react-router-dom";
import TeamDetailsInfo from "./team-details-info/TeamDetailsInfo";

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
    <div className="w-full bg-brand-700 p-6">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">
        <div className="grid grid-cols-3 items-center text-center gap-4 overflow-x-auto">
          <TeamDetailsInfo team={homeTeam} />

          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl font-extrabold text-brand-white leading-none">
              {goals.home ?? "-"} : {goals.away ?? "-"}
            </p>

            <div className="flex gap-4 mt-2 flex-wrap justify-center">
              <div className="text-center">
                <p className="text-xs text-brand-orange font-semibold">HT</p>
                <p className="text-xs font-bold">
                  {score.halftime?.home ?? "-"} : {score.halftime?.away ?? "-"}
                </p>
              </div>

              <div className="text-center">
                <p className="text-xs text-brand-orange font-semibold">FT</p>
                <p className="text-xs font-bold">
                  {score.fulltime?.home ?? "-"} : {score.fulltime?.away ?? "-"}
                </p>
              </div>
            </div>
          </div>

          <TeamDetailsInfo team={awayTeam} />
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <Link
            data-testid="league-link"
            to={`/league/${league.id}`}
            className="text-s font-semibold text-brand-white hover:text-brand-orange hover:underline transition"
          >
            🏆 {league?.id ? league.name : "Unknown League"}
          </Link>

          {venue.name && venue.city && (
            <div
              data-testid="venue-details"
              className="text-s text-brand-lightGray text-center max-w-md"
            >
              <p className="break-words whitespace-normal">📍 {venue.name}</p>
              <p className="break-words whitespace-normal">{venue.city}</p>
            </div>
          )}

          <p data-testid="match-date" className="text-s text-brand-yellow">
            📅 {new Date(date).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};
