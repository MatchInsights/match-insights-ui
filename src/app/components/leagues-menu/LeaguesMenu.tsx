import { useState } from "react";
import { X } from "lucide-react";
import ballimage from "../../images/ball.png";
import { LeaguesMenuGrid } from "./leagues-menu-grid/LeaguesMenuGrid";
import { LeagueBasicInfo, LeaguesGroups } from "../../types/league-groups";
import { ApiService } from "../../services/apiService";
import NoData from "../no-data/NoData";
import { LeaguesMenuOptions } from "./leagues-menu-options/LeaguesMenuOptions";
import { FiArrowLeft } from "react-icons/fi";

interface LeaguesMenuProps {
  setLeague: (league: LeagueBasicInfo) => void;
  apiService: ApiService;
}
export const LeaguesMenu = ({ setLeague, apiService }: LeaguesMenuProps) => {
  const [loading, setLoading] = useState(true);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [selectedoption, setSelectedOption] = useState<string | null>(null);
  const [selectionOptionSearch, setSelectionOptionSearch] = useState("");

  const [leaguesGroups, setLeaguesGroups] = useState<LeaguesGroups | null>(
    null
  );

  const selectOption = (option: string) => {
    setSelectedOption(option);
  };

  const selectionOptions: string[] = [
    "Internationals",
    ...(leaguesGroups?.countryLeagues.map((it) => it.country) || []),
    "Others",
  ];

  const filteredSelectionOptions = selectionOptions.filter((it) =>
    it.toLowerCase().includes(selectionOptionSearch.toLowerCase())
  );

  const leagues = () => {
    if (selectedoption === "Internationals") {
      return leaguesGroups?.internationals || [];
    }

    if (selectedoption === "Others") {
      return leaguesGroups?.others || [];
    }

    return (
      leaguesGroups?.countryLeagues.find((it) => it.country === selectedoption)
        ?.leagues || []
    );
  };

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

  const onDisplayClick = (isDisplayedValue: boolean) => {
    setSelectedOption(null);
    setIsDisplayed(isDisplayedValue);
    setSelectionOptionSearch("");
    fetchData();
  };

  const closeMenu = () => {
    setSelectedOption(null);
    setIsDisplayed(false);
    setSelectionOptionSearch("");
  };

  const cleanUpSelection = () => {
    setSelectedOption(null);
    setSelectionOptionSearch("");
  };
  const setLeagueAndCleanUp = (league: LeagueBasicInfo) => {
    setLeague(league);
    setSelectedOption(null);
    setIsDisplayed(false);
    setSelectionOptionSearch("");
  };

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
          <div className="flex justify-between items-center rounded w-full m-2 p-2">
            <div className="flex flex-row items-center gap-4 flex-1 min-w-0">
              <h2 className="text-sm text-brand-orange font-bold ">
                {!selectedoption ? "Leagues Menu" : `${selectedoption} Leagues`}
              </h2>

              {!selectedoption && (
                <input
                  type="text"
                  placeholder="Search"
                  className="placeholder-brand-orange text-xs text-brand-royalblue border rounded p-2 w-full max-w-xs sm:max-w-sm focus:outline-none"
                  onChange={(e) => setSelectionOptionSearch(e.target.value)}
                />
              )}

              {selectedoption && (
                <button
                  onClick={() => cleanUpSelection()}
                  className="p-2 rounded-full flex items-center justify-center hover:bg-brand-bluelight hover:text-brand-darkBg"
                  title="Go back"
                >
                  <FiArrowLeft className="w-5 h-5" />
                </button>
              )}
            </div>
            <X
              className="cursor-pointer ml-2 text-brand-white shrink-0"
              onClick={() => onDisplayClick(false)}
              data-testid="close-leagues-menu-icon"
            />
          </div>

          {loading && <NoData displayedMessage="Fetching Leagues..." />}
          {!loading && !leaguesGroups && (
            <NoData displayedMessage="We could not find any Leagues." />
          )}
          {!loading && leaguesGroups && !selectedoption && (
            <LeaguesMenuOptions
              items={filteredSelectionOptions}
              selectItem={selectOption}
            />
          )}

          {!loading && leaguesGroups && selectedoption && (
            <LeaguesMenuGrid
              leagues={leagues()}
              setLeague={setLeagueAndCleanUp}
              closeMenu={closeMenu}
            />
          )}
        </div>
      )}
    </div>
  );
};
