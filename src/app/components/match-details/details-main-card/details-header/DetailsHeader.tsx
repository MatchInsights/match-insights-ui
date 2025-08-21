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
    <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-4 sm:gap-10 mb-6 text-left sm:text-center">
      <Link
        data-testid="home-team-link"
        to={`/team/${homeTeam.id}`}
        className=" hover:text-brand-orange hover:underline transition duration-300"
      >
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <TeamLogo src={homeTeam.logo} />
          <span className="text-brand-orange text-2xl md:text-3xl font-bold">
            {homeTeam.name}
          </span>
        </div>
      </Link>

      <span className="text-brand-lightGray text-xl md:text-2xl font-semibold w-full sm:w-auto text-center sm:text-center">
        vs
      </span>

      <Link
        data-testid="away-team-link"
        to={`/team/${awayTeam.id}`}
        className=" hover:text-brand-orange hover:underline transition duration-300"
      >
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <TeamLogo src={awayTeam.logo} />
          <span className="text-brand-orange text-2xl md:text-3xl font-bold">
            {awayTeam.name}
          </span>
        </div>
      </Link>
    </div>
  );
}
