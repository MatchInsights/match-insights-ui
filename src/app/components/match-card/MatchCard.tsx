import { TodayMatch } from "../../types/types";
import CardInfo from "./card-info/CardInfo";
import CardTeam from "./team/CardTeam";

interface MatchCardProps {
  todayMatch: TodayMatch;
}

const MatchCard = ({ todayMatch }: MatchCardProps) => {
  const { homeTeam, awayTeam, date, matchStatus, venue, league } = todayMatch;

  return (
    <div className="bg-brand-card rounded-xl p-4 shadow-md text-brand-white text-base text-md md:text-lg">
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
    </div>
  );
};

export default MatchCard;
