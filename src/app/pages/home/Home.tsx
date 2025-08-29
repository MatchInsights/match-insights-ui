import { useEffect, useState } from "react";
import SubHeader from "../../components/sub-header/SubHeader";
import MatchControls from "../../components/today-matches/match-controls/MatchControls";
import TodayMatches from "../../components/today-matches/TodayMatches";
import { ApiService } from "../../services/apiService";
import { TodayMatch } from "../../types/types";
import NoData from "../../components/no-data/NoData";

interface HomeProps {
  apiService: ApiService;
}

const Home = ({ apiService }: HomeProps) => {
  const [status, setStatus] = useState("NOT_STARTED");
  const [matches, setMatches] = useState<TodayMatch[]>([]);
  const [teamFilter, setTeamFilter] = useState("");

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

    return teamMatch;
  });

  return (
    <div className="w-full justify-between px-12 py-12">
      <SubHeader
        navigateBack={false}
        onRefresh={fetchData}
        title="Matches of the Day"
        displayAnimation={true}
      />

      <MatchControls
        status={status}
        setStatus={setStatus}
        teamFilter={teamFilter}
        setTeamFilter={setTeamFilter}
      />

      {loading && <NoData displayedMessage="Fetching Matches of the Day." />}
      {!loading && matches.length === 0 && (
        <NoData displayedMessage="We could not find any matches." />
      )}
      {!loading && matches.length > 0 && <TodayMatches matches={filtered} />}
    </div>
  );
};

export default Home;
