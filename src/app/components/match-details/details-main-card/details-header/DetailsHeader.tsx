import { Team } from "../../../../types/types";

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
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {homeTeam.logo ? (
          <img
            src={homeTeam.logo}
            alt=""
            className="w-10 h-10 md:w-14 md:h-14 object-contain"
            data-testid="home-team-logo"
          />
        ) : (
          <div className="w-10 h-10 md:w-14 md:h-14 bg-brand-darkGray rounded-full" />
        )}
        <span className="text-brand-orange text-2xl md:text-3xl font-bold">
          {homeTeam.name}
        </span>
      </div>

      <span className="text-brand-lightGray text-xl md:text-2xl font-semibold w-full sm:w-auto text-center sm:text-center">
        vs
      </span>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        {awayTeam.logo ? (
          <img
            src={awayTeam.logo}
            alt=""
            className="w-10 h-10 md:w-14 md:h-14 object-contain"
            data-testid="away-team-logo"
          />
        ) : (
          <div className="w-10 h-10 md:w-14 md:h-14 bg-brand-darkGray rounded-full" />
        )}
        <span className="text-brand-orange text-2xl md:text-3xl font-bold">
          {awayTeam.name}
        </span>
      </div>
    </div>
  );
}
