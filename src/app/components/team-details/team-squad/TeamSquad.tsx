import { PlayerSummary } from "../../../types/types";
import { PlayerCard } from "./player/PlayerCard";

interface TeamSquadProps {
  players: PlayerSummary[];
}

export const TeamSquad = ({ players }: TeamSquadProps) => {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4 text-brand-orange">Squad</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {players.map((player, idx) => (
          <PlayerCard key={idx} playerSummary={player} />
        ))}
      </div>
    </div>
  );
};
