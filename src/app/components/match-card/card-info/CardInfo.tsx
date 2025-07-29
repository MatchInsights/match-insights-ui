import { League, MatchStatus, Venue } from "../../../types/types";

interface CardInfoProps {
  date: string | undefined;
  matchStatus: MatchStatus | undefined;
  venue: Venue | undefined;
  league: League | undefined;
}
const CardInfo = ({ date, matchStatus, venue, league }: CardInfoProps) => {
  let localDate: Date | null = null;

  if (date) {
    try {
      const utcDate = new Date(date);
      localDate = utcDate;
    } catch (e) {
      console.error("Invalid date format:", e);
    }
  }

  const formattedLocalTime = localDate
    ? localDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "TBD";

  const formattedLocalDate = localDate ? localDate.toLocaleDateString() : "TBD";

  return (
    <>
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
    </>
  );
};

export default CardInfo;
