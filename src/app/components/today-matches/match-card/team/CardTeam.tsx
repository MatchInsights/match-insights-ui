import { Team } from "../../../../types/types";
import TeamLogo from "../../../team-logo/TeamLogo";

interface TeamProps {
  team: Team | undefined;
}
const CardTeam = ({ team }: TeamProps) => {
  return (
    <div className="flex items-center gap-2 text-center text-left">
      <TeamLogo src={team?.logo} />
      <span className="font-medium">{team?.name || "Unknown Team"}</span>
    </div>
  );
};

export default CardTeam;
