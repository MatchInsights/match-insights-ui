import { Link } from "react-router-dom";
import { TodayMatch } from "../../../types/types";
import TeamLogo from "../../team-logo/TeamLogo";

interface MatchCardProps {
  todayMatch: TodayMatch;
}

const MatchCard = ({ todayMatch }: MatchCardProps) => {
  const { homeTeam, awayTeam, date, matchStatus, league, id } = todayMatch;

  let localDate: Date | null = null;

  if (date) {
    const utcDate = new Date(date);
    localDate = utcDate;
  }

  const formattedLocalTime = localDate
    ? localDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "Unknown Time";

  const formattedLocalDate = localDate
    ? localDate.toLocaleDateString()
    : "Unknown Date";

  return (
    <div className="py-4 px-4 rounded-3xl w-full my-4 shadow-xl">
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
        <div className="flex flex-row items-center text-center">
          <TeamLogo src={homeTeam?.logo} />
          <TeamLogo src={awayTeam?.logo} />
        </div>

        <div className="flex flex-col mt-4 md:mt-0 justify-center items-center text-center">
          <p className="font-semibold text-xs text-brand-orange">
            {matchStatus?.long || "Unknown Status"}
          </p>
          <p className="mt-1 text-xs text-brand-yellow">
            {matchStatus?.elapsed != null && (
              <span className="text-brand-white">
                ({matchStatus.elapsed} min)
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col">
        <p className="flex flex-wrap my-1">
          <span className="text-xs font-semibold">Home:</span>
          <span className="mx-1 text-xs text-brand-lightGray">
            {homeTeam?.name || "Unknown"}
          </span>
        </p>
        <p className="flex flex-wrap my-1">
          <span className="text-xs font-semibold">Away:</span>
          <span className="mx-1 text-xs text-brand-lightGray">
            {awayTeam?.name || "Unknown"}
          </span>
        </p>
        <div className="flex flex-col mt-1">
          <p className="flex flex-wrap my-1">
            <span className="text-xs">📅</span>
            <span className="text-brand-white mx-1 text-xs">
              {formattedLocalDate}
            </span>
          </p>
          <p className="flex flex-wrap my-1">
            <span className="text-xs">⏰</span>{" "}
            <span className="text-brand-white mx-1 text-xs">
              {formattedLocalTime}
            </span>
          </p>
          <p className="flex flex-wrap my-1">
            <span className="text-xs">🏆</span>{" "}
            <span className="text-brand-white mx-1 text-xs">
              {league?.id ? league?.name : "Unknown League"}
            </span>
          </p>
        </div>

        <div className="mt-2 flex flex-wrap justify-between">
          <div className="flex items-left mx-1 my-1 p-1">
            <Link
              to={`/match/${id}`}
              className="text-brand-orange text-xs hover:text-brand-yellow  hover:-translate-y-1
              transition-all duration-300 ease-in-out cursor-pointer"
            >
              <button>More Info</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
