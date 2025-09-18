import { Link } from "react-router-dom";
import { Team } from "../../../../types/types";
import Logo from "../../../logo/Logo";

interface TeamDetailsInfoProps {
  team: Team;
}

export default function TeamDetailsInfo({ team }: TeamDetailsInfoProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Logo
        src={team.logo}
        customIconWrapperClass="w-20 h-20 bg-transparent rounded-full flex items-center justify-center mx-2"
        customImageClass="w-20 h-20 object-contain"
      />
      <Link
        data-testid={"team-link"}
        to={team?.id ? `/team/${team.id}` : "#"}
        className="text-s font-extrabold text-brand-white capitalize hover:text-brand-orange hover:underline transition"
      >
        {team.name}
      </Link>
    </div>
  );
}
