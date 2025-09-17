import { useState } from "react";
import { X } from "lucide-react"; // icons
import ballimage from "../../images/ball.png";

const leaguesdata = [
  { id: 1, name: "UEFA Champions League" },
  { id: 2, name: "Premier League" },
  { id: 3, name: "La Liga" },
  { id: 4, name: "Serie A" },
  { id: 5, name: "Bundesliga" },
  { id: 6, name: "Ligue 1" },
  { id: 7, name: "Eredivisie" },
  { id: 8, name: "Primeira Liga" },
];

export const LeaguesMenu = () => {
  const [leagues, setLeagues] = useState(leaguesdata);

  const [isDisplayed, setIsDisplayed] = useState(false);

  const filterArticles = (value: string) => {
    const filteredLeagues = leagues.filter((it) =>
      it.name.toLowerCase().includes(value.toLowerCase())
    );

    setLeagues(filteredLeagues);
  };

  const onDisplayClick = (isDisplayedValue: boolean) => {
    setIsDisplayed(isDisplayedValue);
    setLeagues(leaguesdata);
    console.log(isDisplayedValue);
  };

  return (
    <div data-testid="blog-menu">
      <img
        src={ballimage}
        alt="Leagues Menu"
        className="fixed cursor-pointer w-12 h-12 mr-10 animate-spin [animation-duration:3s] right-0"
        onClick={() => onDisplayClick(!isDisplayed)}
        data-testid="tdd-cycle"
      />

      {isDisplayed && (
        <div
          className="fixed top-20 left-10 h-full w-[70%] shadow-lg p-4 z-40 bg-brand-blueintense"
          data-testid="leagues-menu"
        >
          <div className="p-4 flex justify-between items-center rounded w-full mb-4 gap-2">
            <input
              type="text"
              placeholder="Search"
              className="text-brand-white placeholder-brand-orange  rounded w-full focus:outline-none ml-0 p-3 border rounded"
              onChange={(e) => filterArticles(e.target.value)}
            />

            <X
              className="cursor-pointer ml-4 text-brand-white"
              onClick={() => onDisplayClick(false)}
              data-testid="close-icon"
            />
          </div>

          <ul className="mt-8 overflow-auto">
            {leagues.map((it) => (
              <li key={it.id} className="mb-4">
                {it.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
