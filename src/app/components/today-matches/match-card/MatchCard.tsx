import { Link } from "react-router-dom";
import { TodayMatch } from "../../../types/types";
import CardInfo from "./card-info/CardInfo";
import CardHeader from "./header/CardHeader";

interface MatchCardProps {
  todayMatch: TodayMatch;
}

const MatchCard = ({ todayMatch }: MatchCardProps) => {
  const { homeTeam, awayTeam, date, matchStatus, venue, league, id } =
    todayMatch;

  return (
    <Link
      to={`/match/${id}`}
      className="block p-4 text-brand-white text-sm 
    hover:bg-brand-navbar hover:shadow-lg hover:-translate-y-1 
    hover:ring-2 hover:ring-brand-yellow
    transition-all duration-300 ease-in-out cursor-pointer"
    >
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <CardHeader hometeam={homeTeam} awayteam={awayTeam} />
        <CardInfo
          date={date}
          matchStatus={matchStatus}
          venue={venue}
          league={league}
        />
      </div>
    </Link>
  );
};

export default MatchCard;
