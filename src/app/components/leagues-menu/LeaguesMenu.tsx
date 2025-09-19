import { useState } from "react";
import { X } from "lucide-react";
import ballimage from "../../images/ball.png";
import { LeaguesMenuGrid } from "./leagues-menu-grid/LeaguesMenuGrid";
import { LeagueBasicInfo, LeaguesGroups } from "../../types/league-groups";
import { ApiService } from "../../services/apiService";
import NoData from "../no-data/NoData";

interface LeaguesMenuProps {
  setLeague: (league: LeagueBasicInfo) => void;
  apiService: ApiService;
}

export const LeaguesMenu = ({ setLeague, apiService }: LeaguesMenuProps) => {
  const [leagueNameSearch, setLeagueNameSearch] = useState("");
  const [leagueCountrySearch, setLeagueCountrySearch] = useState("");
  const [isDisplayed, setIsDisplayed] = useState(false);

  const [leaguesGroups, setLeaguesGroups] = useState<LeaguesGroups | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    apiService
      .fetchLeaguesGroups()
      .then((data) => {
        setLeaguesGroups(data);
        setLoading(false);
      })
      .catch(() => {
        setLeaguesGroups(null);
        setLoading(false);
      });
  };

  const filteredInternationals = leaguesGroups?.internationals.filter((it) =>
    it.name.toLowerCase().includes(leagueNameSearch.toLowerCase())
  );

  const filteredOtherLeagues = leaguesGroups?.others.filter((it) =>
    it.name.toLowerCase().includes(leagueNameSearch.toLowerCase())
  );

  const filteredCountryLeagues = leaguesGroups?.countryLeagues
    .map((it) => ({
      ...it,
      leagues: it.leagues.filter((league) =>
        league.name.toLowerCase().includes(leagueNameSearch.toLowerCase())
      ),
    }))
    .filter(
      (it) =>
        it.leagues.length > 0 &&
        it.country.toLowerCase().includes(leagueCountrySearch.toLowerCase())
    );

  const onDisplayClick = () => {
    setIsDisplayed(!isDisplayed);
    if (!isDisplayed) {
      setLeagueNameSearch("");
      setLeagueCountrySearch("");
      fetchData();
    }
  };

  const closeMenu = () => setIsDisplayed(false);


  return (
    <div data-testid="blog-menu">
      {/* Icono que abre el menú flotando abajo a la derecha */}
      <img
        src={ballimage}
        alt="Leagues Menu"
        className="fixed cursor-pointer w-22 h-20 animate-spin [animation-duration:3s] right-4 bottom-4 z-50"
        onClick={onDisplayClick}
        data-testid="menu-ball-icon"
      />

      {/* Overlay semi-transparente */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isDisplayed ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Panel deslizable desde el lado izquierdo sin tapar la navbar */}
      <div
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] w-[70%] bg-brand-gridblue shadow-lg p-4 z-50 overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${isDisplayed ? "translate-x-0" : "-translate-x-full"}
        `}
        data-testid="leagues-menu"
      >
        <div className="flex justify-between items-center rounded w-full">
          <div className="flex flex-row items-left m-1 gap-1 w-full">
            <input
              type="text"
              placeholder="Name of the League"
              className="placeholder-brand-black text-xs text-brand-royalblue rounded w-full focus:outline-none m-2 p-2 border"
              onChange={(e) => setLeagueNameSearch(e.target.value)}
            />
            <input
              type="text"
              placeholder="Country League"
              className="placeholder-brand-black text-xs text-brand-royalblue rounded w-full focus:outline-none m-2 p-2 border"
              onChange={(e) => setLeagueCountrySearch(e.target.value)}
            />
          </div>

          <X
            className="cursor-pointer m-4 text-brand-white"
            onClick={closeMenu}
            data-testid="close-leagues-menu-icon"
          />
        </div>

        {loading && <NoData displayedMessage="Fetching Leagues..." />}
        {!loading && !leaguesGroups && (
          <NoData displayedMessage="We could not find any Leagues." />
        )}
        {!loading && leaguesGroups && (
          <LeaguesMenuGrid
            internationals={filteredInternationals ?? []}
            countryLeagues={filteredCountryLeagues ?? []}
            others={filteredOtherLeagues ?? []}
            setLeague={setLeague}
            closeMenu={closeMenu}
          />
        )}
      </div>
    </div>
  );
};
