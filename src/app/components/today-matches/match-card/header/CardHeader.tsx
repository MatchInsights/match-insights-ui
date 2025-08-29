import { Team } from "../../../../types/types";
import TeamLogo from "../../../team-logo/TeamLogo";

interface TeamProps {
  hometeam: Team | undefined;
  awayteam: Team | undefined;
}
const CardHeader = ({ hometeam, awayteam }: TeamProps) => {
  return (
    <h1 className="flex flex-col items-center gap-2 text-center">
      <div className="flex items-center gap-2">
        <TeamLogo src={hometeam?.logo} />
        <span className="text-md">{hometeam?.name || "Unknown Team"}</span>
      </div>

      <div className="flex items-center gap-2">
        <TeamLogo src={awayteam?.logo} />
        <span className="text-md">{awayteam?.name || "Unknown Team"}</span>
      </div>
    </h1>
  );
};

export default CardHeader;
