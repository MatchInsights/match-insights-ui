import { TodayMatch } from "../../types/types";

interface MatchCardProps {
  todayMatch: TodayMatch;
}

const MatchCard = ({ todayMatch }: MatchCardProps) => {
  const { homeTeam, awayTeam, date, matchStatus, venue, league, timeZone } =
    todayMatch;

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
    <div className="bg-brand-card rounded-xl p-3 shadow-md text-brand-white text-xs">
      <ul className="space-y-1">
        <li className="flex items-center gap-1">
          {homeTeam?.logo && (
            <img src={homeTeam.logo} alt={homeTeam.name} className="w-4 h-4" />
          )}
          <span>{homeTeam?.name || "TBD"}</span>
          <span className="text-brand-lightGray">vs</span>
          {awayTeam?.logo && (
            <img src={awayTeam.logo} alt={awayTeam.name} className="w-4 h-4" />
          )}
          <span>{awayTeam?.name || "TBD"}</span>
        </li>

        <li className="text-brand-orange font-semibold">
          {matchStatus?.long || "Upcoming"}{" "}
          {matchStatus?.elapsed != null && (
            <span className="text-brand-lightGray">
              ({matchStatus.elapsed} min)
            </span>
          )}
        </li>

        <li className="text-brand-lightGray">
          🏆 {league?.name || "Unknown League"}
        </li>

        <li className="text-brand-lightGray">🏟 {venue?.name || "TBD"}</li>

        <li className="text-brand-yellow">
          📅 {formattedLocalDate} — ⏰ {formattedLocalTime}
        </li>
      </ul>
    </div>
  );
};

export default MatchCard;
