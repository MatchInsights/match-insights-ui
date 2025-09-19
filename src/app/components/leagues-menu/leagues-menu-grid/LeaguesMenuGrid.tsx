import { CountryLeagues, LeagueBasicInfo } from "../../../types/league-groups";
import Logo from "../../logo/Logo";

interface LeaguesMenuGridProps {
  internationals: LeagueBasicInfo[];
  countryLeagues: CountryLeagues[];
  others: LeagueBasicInfo[];
  setLeague: (league: LeagueBasicInfo) => void;
  closeMenu: () => void;
  isInternationalHidden: boolean;
}

export const LeaguesMenuGrid = ({
  internationals,
  countryLeagues,
  others,
  setLeague,
  closeMenu,
  isInternationalHidden,
}: LeaguesMenuGridProps) => {
  const onClickLeague = (league: LeagueBasicInfo) => {
    setLeague(league);
    closeMenu();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {internationals.length > 0 && !isInternationalHidden && (
        <ul className="shadow bg-brand-card text-brand-white rounded-2xl p-2">
          <h2 className="text-lg text-brand-orange font-semibold m-2">
            Internationals
          </h2>
          {internationals.map((league) => (
            <li
              data-testid={`league-${league.id}`}
              key={league.id}
              className="flex items-center gap-1 m-2 hover:underline hover:cursor-pointer hover:text-brand-yellow"
              onClick={() => onClickLeague(league)}
            >
              <Logo src={league.logo} customImageClass="w-6 h-6" />
              <span className="text-sm">{league.name}</span>
            </li>
          ))}
        </ul>
      )}

      {countryLeagues.length > 0 && (
        <ul className="shadow bg-brand-card text-brand-white rounded-2xl p-2 col-span-1 md:col-span-2">
          <h2 className="text-lg text-brand-orange font-semibold m-2">
            By Country
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {countryLeagues.map((country) => (
              <li key={country.country}>
                <div className="flex items-center gap-1 m-2">
                  <Logo src={country.flag} customImageClass="w-6 h-6" />
                  <span className="font-medium text-lg text-brand-aqualight">
                    {country.country}
                  </span>
                </div>
                <ul className="ml-6 list-disc">
                  {country.leagues.map((league) => (
                    <li
                      data-testid={`league-${league.id}`}
                      key={league.id}
                      className="flex items-center gap-1 m-2 hover:underline hover:cursor-pointer hover:text-brand-yellow"
                      onClick={() => onClickLeague(league)}
                    >
                      <Logo src={league.logo} customImageClass="w-6 h-6" />
                      <span className="text-sm">{league.name}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </div>
        </ul>
      )}

      {others.length > 0 && (
        <ul className="shadow bg-brand-card text-brand-white rounded-2xl p-2">
          <h2 className="text-lg text-brand-orange font-semibold m-2">
            Others
          </h2>
          {others.map((league) => (
            <li
              data-testid={`league-${league.id}`}
              key={league.id}
              className="flex items-center gap-1 mb-2 hover:underline hover:cursor-pointer hover:text-brand-yellow"
              onClick={() => onClickLeague(league)}
            >
              <Logo src={league.logo} customImageClass="w-6 h-6" />

              <span className="text-sm">{league.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
