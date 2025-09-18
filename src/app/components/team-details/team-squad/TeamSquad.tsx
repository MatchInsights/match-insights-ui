import { PlayerSummary } from "../../../types/types";
import { PlayerCard } from "./player/PlayerCard";

interface TeamSquadProps {
  players: PlayerSummary[];
}

export const TeamSquad = ({ players }: TeamSquadProps) => {
  return (
    <div className="rounded bg-brand-card p-6">
      <h2 className="mb-4 text-lg font-semibold text-brand-white">Squad</h2>
      <div className="grid w-full grid-cols-1 gap-4 p-4 shadow-md sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {players.map((player, idx) => (
          <PlayerCard key={idx} playerSummary={player} />
        ))}
      </div>
    </div>
  );
};
