import { Link } from "react-router-dom";
import { TodayMatch } from "../../../types/types";
import CardInfo from "./card-info/CardInfo";
import CardTeam from "./team/CardTeam";

interface MatchCardProps {
  todayMatch: TodayMatch;
}

const MatchCard = ({ todayMatch }: MatchCardProps) => {
  const { homeTeam, awayTeam, date, matchStatus, venue, league, id } =
    todayMatch;

  return (
    <Link
      to={`/match/${id}`}
      className="block bg-brand-card rounded-xl p-4 shadow-md text-brand-white text-base md:text-lg
      hover:bg-brand-navbar hover:shadow-lg hover:-translate-y-1 hover:ring-2 hover:ring-brand-yellow
      transition-all duration-300 ease-in-out cursor-pointer"
    >
      <div className="flex flex-col md:flex-row items-start gap-4">
        <div className="flex flex-col items-start w-full md:w-1/2 space-y-2">
          <CardTeam team={homeTeam} />
          <span className="text-brand-lightGray ml-11">vs</span>
          <CardTeam team={awayTeam} />
        </div>

        <div className="flex flex-col w-full md:w-1/2 space-y-2">
          <CardInfo
            date={date}
            matchStatus={matchStatus}
            venue={venue}
            league={league}
          />
        </div>
      </div>
    </Link>
  );
};

export default MatchCard;
