import { TodayMatch } from "../../types/types";

interface MatchCardProps {
  todayMatch: TodayMatch;
}

const MatchCard = ({ todayMatch }: MatchCardProps) => {
  const { homeTeam, awayTeam, date, matchStatus, venue, league } = todayMatch;

  let localDate: Date | null = null;

  if (date) {
    try {
      const utcDate = new Date(date);
      localDate = utcDate; // Already in UTC
    } catch (e) {
      console.error("Invalid date format:", e);
    }
  }

  const formattedLocalTime = localDate
    ? localDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "TBD";

  const formattedLocalDate = localDate ? localDate.toLocaleDateString() : "TBD";

  return (
    <div className="bg-brand-card rounded-xl p-4 shadow-md text-brand-white text-[10px]">
      <div className="flex flex-row items-center gap-4">
        {/* Left: Teams */}
        <div className="flex flex-col items-start w-[45%] space-y-2">
          {/* Home Team */}
          <div className="flex items-center gap-2">
            {homeTeam?.logo ? (
              <img
                src={homeTeam.logo}
                alt={homeTeam.name}
                className="w-5 h-5 object-contain"
              />
            ) : (
              <div className="w-5 h-5 bg-brand-darkGray rounded-full" />
            )}
            <span className="font-medium">{homeTeam?.name || "TBD"}</span>
          </div>

          {/* VS */}
          <span className="text-brand-lightGray ml-7">vs</span>

          {/* Away Team */}
          <div className="flex items-center gap-2">
            {awayTeam?.logo ? (
              <img
                src={awayTeam.logo}
                alt={awayTeam.name}
                className="w-5 h-5 object-contain"
              />
            ) : (
              <div className="w-5 h-5 bg-brand-darkGray rounded-full" />
            )}
            <span className="font-medium">{awayTeam?.name || "TBD"}</span>
          </div>
        </div>

        {/* Right: Match Info */}
        <div className="flex flex-col w-[55%] space-y-1">
          <div className="text-brand-orange font-semibold">
            {matchStatus?.long || "Upcoming"}{" "}
            {matchStatus?.elapsed != null && (
              <span className="text-brand-lightGray">
                ({matchStatus.elapsed} min)
              </span>
            )}
          </div>

          <div className="text-brand-lightGray">
            🏆 {league?.name || "Unknown League"}
          </div>

          <div className="text-brand-lightGray">🏟 {venue?.name || "TBD"}</div>

          <div className="text-brand-yellow">
            📅 {formattedLocalDate} — ⏰ {formattedLocalTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
