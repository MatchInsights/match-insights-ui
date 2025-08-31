import { Link } from "react-router-dom";
import { Team } from "../../../../types/types";
import TeamLogo from "../../../team-logo/TeamLogo";

interface DetailHeaderProps {
  homeTeam: Team;
  awayTeam: Team;
}

export default function DetailsHeader({
  homeTeam,
  awayTeam,
}: DetailHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-2 m-4 text-center">
      <Link
        data-testid="home-team-link"
        to={`/team/${homeTeam.id}`}
        className=" hover:text-brand-white hover:underline transition duration-300"
      >
        <div className="flex items-center gap-2 w-full">
          <TeamLogo src={homeTeam.logo} />
          <span className="text-brand-orange hover:text-brand-yellow text-xl font-bold">
            {homeTeam.name}
          </span>
        </div>
      </Link>

      <Link
        data-testid="away-team-link"
        to={`/team/${awayTeam.id}`}
        className=" hover:text-brand-white hover:underline transition duration-300"
      >
        <div className="flex items-center gap-2 w-full">
          <TeamLogo src={awayTeam.logo} />
          <span className="text-brand-orange hover:text-brand-yellow text-xl font-bold">
            {awayTeam.name}
          </span>
        </div>
      </Link>
    </div>
  );
}
