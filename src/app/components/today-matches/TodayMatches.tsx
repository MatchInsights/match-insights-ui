import MatchCard from "./match-card/MatchCard";
import { TodayMatch } from "../../types/types";

interface TodayMatchesProps {
  matches: TodayMatch[];
}

const TodayMatches = ({ matches }: TodayMatchesProps) => {
  return (
    <div className="w-full justify-between px-12 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-8">
        {matches.length === 0 ? (
          <p className="bg-brand-danger text-center col-span-full py-4 rounded">
            No matches found for the selected filters.
          </p>
        ) : (
          matches.map((match, index) => (
            <MatchCard
              key={`${index}-${match.date}-${match?.homeTeam?.name}-${match?.awayTeam?.name}`}
              todayMatch={match}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodayMatches;
