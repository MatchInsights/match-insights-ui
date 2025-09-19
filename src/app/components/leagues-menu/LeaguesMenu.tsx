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

  const [leaguesGroups, setLeaguesGroups] = useState<LeaguesGroups | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    apiService
      .fetchLeaguesGroups()
      .then((data) => {
        setLeaguesGroups(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setLeaguesGroups(null);
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

  const onDisplayClick = (isDisplayedValue: boolean) => {
    setIsDisplayed(isDisplayedValue);
    setLeagueNameSearch("");
    setLeagueCountrySearch("");
    fetchData();
  };

  const closeMenu = () => {
    setIsDisplayed(false);
  };

  const isInternationalsHidden = () => leagueCountrySearch !== "";

  return (
    <div data-testid="blog-menu">
      <img
        src={ballimage}
        alt="Leagues Menu"
        className="fixed cursor-pointer w-22 h-20 mr-10 animate-spin [animation-duration:3s] right-0"
        onClick={() => onDisplayClick(!isDisplayed)}
        data-testid="menu-ball-icon"
      />

      {isDisplayed && (
        <div
          className="fixed top-20 left-10 h-[calc(100vh-5rem)] w-[70%] shadow-lg p-4 z-40 bg-brand-blueintense overflow-y-auto"
          data-testid="leagues-menu"
        >
          <div className="flex justify-between items-center rounded w-full">
            <div className="flex flex-row items-left m-1 gap-1">
              <input
                type="text"
                placeholder="League Name"
                className="placeholder-brand-orange text-xs text-brand-royalblue rounded w-full focus:outline-none m-2 p-2 border rounded"
                onChange={(e) => setLeagueNameSearch(e.target.value)}
              />
              <input
                type="text"
                placeholder="League Country"
                className="placeholder-brand-orange text-xs text-brand-royalblue rounded w-full focus:outline-none m-2 p-2 border rounded"
                onChange={(e) => setLeagueCountrySearch(e.target.value)}
              />
            </div>

            <X
              className="cursor-pointer m-4 text-brand-white"
              onClick={() => onDisplayClick(false)}
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
              isInternationalHidden={isInternationalsHidden()}
            />
          )}
        </div>
      )}
    </div>
  );
};
