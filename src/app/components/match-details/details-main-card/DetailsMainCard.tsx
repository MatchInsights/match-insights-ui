import { ApiService } from "../../../services/apiService";
import { Goal, League, Score, Team, Venue } from "../../../types/types";
import LastFiveMatches from "../last-five-matches/LastFiveMatches";
import { LeagueTeamAndPoints } from "../LeagueTeamAndPoints";
import MatchScoreCard from "../match-score-card/MatchScoreCard";
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
  return (
    <div
      className="
        grid 
        grid-cols-1 
        md:grid-cols-1 
        lg:grid-cols-3 
        gap-6 
        w-full 
        px-4
      "
      style={{ minHeight: "300px" }}
    >
      {[homeTeam, awayTeam].length && (
        <>
          <div className="flex flex-col  p-4 rounded-xl  h-full flex-1 space-y-8">
            <DetailsHeader homeTeam={homeTeam} awayTeam={awayTeam} />
            <Link
              data-testid="league-link"
              to={`/league/${league.id}`}
              className="text-2xl md:text-3xl lg:text-4xl text-brand-white hover:text-brand-orange hover:underline transition duration-300"
            >
              <span className="flex flex-wrap items-center gap-2">
                🏆 {league?.id ? league.name : "Unknown League"} &mdash;{" "}
                {league.round}
                <span className="text-brand-orange text-base ml-2">&rarr;</span>
              </span>
            </Link>

            <div>
              <p className="text-brand-lightGray text-base">
                📍 {venue.name}, {venue.city}
              </p>
              <p className="text-brand-yellow text-base">
                📅 {new Date(date).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-7xl m-2 font-extrabold text-brand-white leading-none">
                {goals.home ?? "-"} : {goals.away ?? "-"}
                {score.fulltime?.home != null && (
                  <span className="text-brand-white text-2xl ml-4">FT</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center bg-brand-dark p-4 rounded-xl  h-full flex-1">
            <MatchScoreCard score={score} />
          </div>

          <div className="flex flex-col justify-start items-center bg-brand-dark p-4 rounded-xl  h-full flex-1">
            {league.id && (
              <LeagueTeamAndPoints
                homeTeamId={homeTeam.id}
                awayTeamId={awayTeam.id}
                leagueId={league.id}
                apiService={apiService}
              />
            )}
            <LastFiveMatches
              apiService={apiService}
              homeTeamId={homeTeam.id}
              homeTeam={homeTeam.name}
              awayTeam={awayTeam.name}
              awayTeamId={awayTeam.id}
            />
          </div>
        </>
      )}
    </div>
  );
};
