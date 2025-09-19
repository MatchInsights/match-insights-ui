import { LeagueBasicInfo } from "../../../types/league-groups";
import Logo from "../../logo/Logo";

interface LeaguesMenuGridProps {
  leagues: LeagueBasicInfo[];
  setLeague: (league: LeagueBasicInfo) => void;
  closeMenu: () => void;
}

export const LeaguesMenuGrid = ({
  leagues,
  setLeague,
  closeMenu,
}: LeaguesMenuGridProps) => {
  const onClickLeague = (league: LeagueBasicInfo) => {
    setLeague(league);
    closeMenu();
  };

  return (
    <ul
      aria-label="responsive-grid"
      className={`grid gap-4 grid-cols-1 md:[grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] lg:[grid-template-columns:repeat(5,minmax(0,1fr))]`}
    >
      {leagues.map((item, i) => (
        <li
          data-testid={item}
          key={`${item}-${i}`}
          onClick={() => onClickLeague(item)}
          className="p-1 rounded-2xl shadow-sm hover:underline hover:text-brand-yellow outline-none"
          tabIndex={0}
        >
          <div className="flex items-center gap-2 bg-brand-card p-2 rounded cursor-pointer hover:bg-brand-royalblue">
            <Logo src={item.logo} customImageClass="w-5 h-5" />
            <span className="text-lg">{item.name}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};
