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
    <div className="flex items-center gap-4 mb-4 flex-wrap">
      <div className="flex items-center gap-2">
        {homeTeam.logo ? (
          <img
            src={homeTeam.logo}
            alt={""}
            className="w-8 h-8 md:w-10 md:h-10 object-contain"
            data-testid="home-team-logo"
          />
        ) : (
          <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-darkGray rounded-full" />
        )}
        <span className="text-brand-orange text-2xl md:text-3xl font-bold">
          {homeTeam.name}
        </span>
      </div>

      <span className="text-brand-lightGray text-xl md:text-2xl font-semibold">
        vs
      </span>

      <div className="flex items-center gap-2">
        {awayTeam.logo ? (
          <img
            src={awayTeam.logo}
            alt={""}
            className="w-8 h-8 md:w-10 md:h-10 object-contain"
            data-testid="away-team-logo"
          />
        ) : (
          <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-darkGray rounded-full" />
        )}
        <span className="text-brand-orange text-2xl md:text-3xl font-bold">
          {awayTeam.name}
        </span>
      </div>
    </div>
  );
}
