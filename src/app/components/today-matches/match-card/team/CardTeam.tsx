import { Team } from "../../../../types/types";

interface TeamProps {
  team: Team | undefined;
}
const CardTeam = ({ team }: TeamProps) => {
  return (
    <div className="flex items-center gap-2 text-center md:text-left">
      {team?.logo ? (
        <img
          data-testid="team-logo"
          src={team.logo}
          alt={""}
          className="w-4 h-4 object-contain"
        />
      ) : (
        <div className="w-4 h-4 bg-brand-darkGray rounded-full" />
      )}
      <span className="font-medium">{team?.name || "Unknown Team"}</span>
    </div>
  );
};

export default CardTeam;
