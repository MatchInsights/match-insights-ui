import { useEffect, useState } from "react";
import MatchCard from "./match-card/MatchCard";
import MatchControls from "./match-controls/MatchControls";
import { TodayMatch } from "../../types/types";

interface TodayMatchesProps {
  fetchTodayMatches: (status: string) => Promise<TodayMatch[]>;
}

const TodayMatches = ({ fetchTodayMatches }: TodayMatchesProps) => {
  const [status, setStatus] = useState("NOT_STARTED");
  const [matches, setMatches] = useState<TodayMatch[]>([]);
  const [teamFilter, setTeamFilter] = useState("");
  const [leagueFilter, setLeagueFilter] = useState("");

  useEffect(() => {
    fetchTodayMatches(status)
      .then((data) => setMatches(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [status]);

  const filtered = matches.filter((match) => {
    const teamMatch =
      teamFilter === "" ||
      match?.awayTeam?.name?.toLowerCase().includes(teamFilter.toLowerCase()) ||
      match?.homeTeam?.name?.toLowerCase().includes(teamFilter.toLowerCase());

    const leagueMatch =
      leagueFilter === "" ||
      match?.league?.name?.toLowerCase().includes(leagueFilter.toLowerCase());

    return teamMatch && leagueMatch;
  });

  return (
    <div className="w-full mx-auto px-12 py-12">
      <h1 className="text-4xl md:text-6xl font-bold text-orange-400 mb-4">
        Today's Matches
      </h1>

      <MatchControls
        status={status}
        setStatus={setStatus}
        teamFilter={teamFilter}
        setTeamFilter={setTeamFilter}
        leagueFilter={leagueFilter}
        setLeagueFilter={setLeagueFilter}
      />
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-8">
        {filtered.length === 0 ? (
          <p className="bg-brand-danger text-center col-span-full py-4 rounded">
            No matches found for the selected filters.
          </p>
        ) : (
          filtered.map((match) => (
            <MatchCard
              key={`${match.date}-${match?.homeTeam?.name}-${match?.awayTeam?.name}`}
              todayMatch={match}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodayMatches;
