import { League, MatchStatus, Venue } from "../../../../types/types";
import { Link } from "react-router-dom";

interface CardInfoProps {
  date: string | undefined;
  matchStatus: MatchStatus | undefined;
  venue: Venue | undefined;
  league: League | undefined;
}
const CardInfo = ({ date, matchStatus, venue, league }: CardInfoProps) => {
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
    <>
      <div className="text-brand-orange font-semibold">
        {matchStatus?.long || "Unknown Status"}{" "}
        {matchStatus?.elapsed != null && (
          <span className="text-brand-lightGray">
            ({matchStatus.elapsed} min)
          </span>
        )}
      </div>

      <div className="text-brand-lightGray" data-testid={"league-link"}>
        🏆{" "}
        {league?.id ? (
          <Link
            to={`/league/${league.id}`}
            className="hover:underline text-brand-lightGray"
          >
            {league.name}
          </Link>
        ) : (
          "Unknown League"
        )}
      </div>

      <div className="text-brand-lightGray">
        🏟 {venue?.name || "Unknown Venue"}
      </div>

      <div className="text-brand-yellow">
        📅 {formattedLocalDate} — ⏰ {formattedLocalTime}
      </div>
    </>
  );
};

export default CardInfo;
