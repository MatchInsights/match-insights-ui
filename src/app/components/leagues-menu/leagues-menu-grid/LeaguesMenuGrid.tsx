import { useState } from "react";
import { CountryLeagues, LeagueBasicInfo } from "../../../types/league-groups";
import Logo from "../../logo/Logo";

// Importar las banderas
import INTFlag from "../../../../app/images/int.png";
import ARGFlag from "../../../../app/images/arg.png";
import ENGFlag from "../../../../app/images/ing.png";
import SPAFlag from "../../../../app/images/esp.png";
import ITAFlag from "../../../../app/images/ita.png";
import DEUFlag from "../../../../app/images/deu.png";
import PORFlag from "../../../../app/images/por.png";
import FRAFlag from "../../../../app/images/fra.png";
import BRAFlag from "../../../../app/images/bra.png";
import URUFlag from "../../../../app/images/uru.png";
import PARFlag from "../../../../app/images/par.png";
import COLFlag from "../../../../app/images/col.png";
import CHIFlag from "../../../../app/images/chi.png";
import MEXFlag from "../../../../app/images/mex.png";
import USAFlag from "../../../../app/images/usa.png";

interface LeaguesMenuGridProps {
  internationals: LeagueBasicInfo[];
  countryLeagues: CountryLeagues[];
  others: LeagueBasicInfo[];
  setLeague: (league: LeagueBasicInfo) => void;
  closeMenu: () => void;
}

export const LeaguesMenuGrid = ({
  internationals,
  countryLeagues,
  others,
  setLeague,
  closeMenu,
}: LeaguesMenuGridProps) => {
  const [expandedCountries, setExpandedCountries] = useState<string[]>([]);

  const toggleCountry = (countryName: string) => {
    setExpandedCountries((prev) =>
      prev.includes(countryName)
        ? prev.filter((c) => c !== countryName)
        : [...prev, countryName]
    );
  };

  const onClickLeague = (league: LeagueBasicInfo) => {
    setLeague(league);
    closeMenu();
  };

  // Países prioritarios
  const priorityCountries = [
    "Internationals",
    "Argentina",
    "England",
    "Spain",
    "Italy",
    "Germany",
    "Portugal",
    "France",
    "Brazil",
    "Uruguay",
    "Paraguay",
    "Colombia",
    "Chile",
    "Mexico",
    "USA",
  ];

  // Map de banderas
  const flagMap: Record<string, string> = {
    Internationals: INTFlag,
    Argentina: ARGFlag,
    England: ENGFlag,
    Spain: SPAFlag,
    Italy: ITAFlag,
    Germany: DEUFlag,
    Portugal: PORFlag,
    France: FRAFlag,
    Brazil: BRAFlag,
    Uruguay: URUFlag,
    Paraguay: PARFlag,
    Colombia: COLFlag,
    Chile: CHIFlag,
    Mexico: MEXFlag,
    USA: USAFlag,
  };

  // Integrar Internationals como un "país"
  const allCountries: CountryLeagues[] = [
    { country: "Internationals", flag: INTFlag, leagues: internationals },
    ...countryLeagues.map((c) => ({
      ...c,
      flag: flagMap[c.country] || "", // asigna bandera si existe
    })),
  ];

  // Separar prioritarios y no prioritarios
  const priorityList = allCountries
    .filter((c) => priorityCountries.includes(c.country))
    .sort(
      (a, b) =>
        priorityCountries.indexOf(a.country) - priorityCountries.indexOf(b.country)
    );

  const nonPriorityList = allCountries.filter(
    (c) => !priorityCountries.includes(c.country)
  );

  // Ordenar los no prioritarios alfabéticamente
  const sortedNonPriority = nonPriorityList.sort((a, b) =>
    a.country.localeCompare(b.country)
  );

  // Agrupar los no prioritarios por letra inicial
  const groupedByLetter: Record<string, CountryLeagues[]> = {};
  sortedNonPriority.forEach((c) => {
    const firstLetter = c.country.charAt(0).toUpperCase();
    if (!groupedByLetter[firstLetter]) groupedByLetter[firstLetter] = [];
    groupedByLetter[firstLetter].push(c);
  });

  // Reordenar ligas según país
  const reorderLeaguesByCountry = (
    country: string,
    leagues: LeagueBasicInfo[]
  ) => {
    const preferredOrders: Record<string, string[]> = {
      Argentina: ["liga profesional", "copa argentina"],
      France: ["ligue 1", "ligue 2"],
      Uruguay: ["primera división", "segunda división"],
      Chile: ["primera división", "super cup"],
    };

    const order = preferredOrders[country];
    if (!order) return leagues;

    const lowerLeagues = leagues.map((l) => ({ ...l, nameLower: l.name.toLowerCase() }));

    return [
      ...order
        .map((pref) => lowerLeagues.find((l) => l.nameLower.includes(pref)))
        .filter(Boolean) as LeagueBasicInfo[],
      ...leagues.filter(
        (l) =>
          !order.some((pref) => l.name.toLowerCase().includes(pref))
      ),
    ];
  };

  const renderCountry = (country: CountryLeagues) => {
    const leagues = reorderLeaguesByCountry(country.country, country.leagues);
    const mainLeague = leagues.slice(0, 2);
    const otherLeagues = leagues.slice(2);
    const isExpanded = expandedCountries.includes(country.country);

    return (
      <ul
        key={country.country}
        className="shadow bg-brand-card text-brand-white rounded-2xl p-2"
      >
        <div
          className="flex items-center gap-2 m-2 hover:cursor-pointer"
          onClick={() =>
            otherLeagues.length > 0 && toggleCountry(country.country)
          }
        >
          {country.flag && <Logo src={country.flag} customImageClass="w-6 h-6" />}
          <span className="text-xs font-semibold uppercase text-brand-yellow">
            {country.country}{" "}
            {otherLeagues.length > 0 && (
              <span className="text-xs text-brand-yellow hover:text-brand-orange">
                {isExpanded ? "▼" : "▶"}
              </span>
            )}
          </span>
        </div>

        <ul className="ml-6 list-disc mb-2">
          {mainLeague.map((league) => (
            <li
              key={league.id}
              className="flex items-center gap-1 m-2 hover:underline hover:cursor-pointer hover:text-brand-yellow"
              onClick={() => onClickLeague(league)}
            >
              <Logo src={league.logo} customImageClass="w-6 h-6" />
              <span className="text-xs uppercase">{league.name}</span>
            </li>
          ))}
        </ul>

        {isExpanded && otherLeagues.length > 0 && (
          <ul className="ml-6 list-disc">
            {otherLeagues.map((league) => (
              <li
                key={league.id}
                className="flex items-center gap-1 m-2 hover:underline hover:cursor-pointer hover:text-brand-yellow"
                onClick={() => onClickLeague(league)}
              >
                <Logo src={league.logo} customImageClass="w-6 h-6" />
                <span className="text-xs uppercase">{league.name}</span>
              </li>
            ))}
          </ul>
        )}
      </ul>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div className="col-span-1 sm:col-span-2 md:col-span-3">
        <h2 className="text-sm text-brand-green uppercase font-semibold m-2">
          All Leagues
        </h2>
      </div>

      {/* Render Prioritarios */}
      {priorityList.map(renderCountry)}

      {/* Render No Prioritarios agrupados por letra */}
      {Object.keys(groupedByLetter).map((letter) => (
        <div key={letter} className="col-span-1 sm:col-span-2 md:col-span-3">
          <h2 className="text-sm text-brand-green font-semibold m-2">{letter}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {groupedByLetter[letter].map(renderCountry)}
          </div>
        </div>
      ))}

      {/* Otros */}
      {others.length > 0 && (
        <ul className="shadow bg-brand-card text-brand-white rounded-2xl p-2 col-span-1 sm:col-span-2 md:col-span-3">
          <h2 className="text-lg text-brand-orange font-semibold m-2">Others</h2>
          {others.map((league) => (
            <li
              key={league.id}
              className="flex items-center gap-1 mb-2 hover:underline hover:cursor-pointer hover:text-brand-yellow"
              onClick={() => onClickLeague(league)}
            >
              <Logo src={league.logo} customImageClass="w-6 h-6" />
              <span className="text-xs uppercase">{league.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
