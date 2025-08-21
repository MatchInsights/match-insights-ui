import { useEffect, useState } from "react";
import MatchCard from "./match-card/MatchCard";
import MatchControls from "./match-controls/MatchControls";
import { TodayMatch } from "../../types/types";
import { ApiService } from "../../services/apiService";
import NoData from "../no-data/NoData";
import SubHeader from "../sub-header/SubHeader";

interface TodayMatchesProps {
  apiService: ApiService;
}

const TodayMatches = ({ apiService }: TodayMatchesProps) => {
  const [status, setStatus] = useState("NOT_STARTED");
  const [matches, setMatches] = useState<TodayMatch[]>([]);
  const [teamFilter, setTeamFilter] = useState("");
  const [leagueFilter, setLeagueFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    apiService
      .fetchTodayMatches(status)
      .then((data) => {
        setMatches(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setMatches([]);
      });
  };

  useEffect(() => {
    fetchData();
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

  if (loading) return <NoData />;

  if (!loading && matches.length === 0) return <NoData />;

  return (
    <div className="w-full mx-auto px-12 py-12">
      <SubHeader
        navigateBack={false}
        onRefresh={fetchData}
        title="Matches of the Day"
      />

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
          filtered.map((match, index) => (
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
