import { useEffect, useState } from "react";
import { TeamDetails, TeamPlayer } from "../../types/types";
import TeamInfo from "../../components/team-details/team-info/TeamInfo";
import { TeamSquad } from "../../components/team-details/team-squad/TeamSquad";
import { ApiService } from "../../services/apiService";
import { useParams } from "react-router-dom";
import FetchStatus from "../../components/fetch-status/FetchStatus";
import SubHeader from "../../components/sub-header/SubHeader";

interface TeamDetailsPageProps {
  apiService: ApiService;
}

const TeamDetailsPage = ({ apiService }: TeamDetailsPageProps) => {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<TeamDetails | null>(null);
  const [players, setPlayers] = useState<TeamPlayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    Promise.all([
      apiService.fetchTeamDetails(Number(id)),
      apiService.fetchTeamPlayers(Number(id)),
    ])
      .then(([teamDetails, playerList]) => {
        setDetails(teamDetails);
        setPlayers(playerList);
      })
      .catch(() => {
        setDetails(null);
        setPlayers([]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <FetchStatus type="loading" message="Loading Team Details..." />;

  return (
    <div className="min-h-screen text-brand-white p-4 md:p-8 space-y-8">
      <SubHeader title="Team Details" />
      {details ? (
        <TeamInfo teamDetails={details} />
      ) : (
        <FetchStatus type="error" message="No Team Details..." />
      )}

      {players.length > 0 ? (
        <TeamSquad players={players} />
      ) : (
        <FetchStatus type="error" message="Players Not Found..." />
      )}
    </div>
  );
};

export default TeamDetailsPage;
