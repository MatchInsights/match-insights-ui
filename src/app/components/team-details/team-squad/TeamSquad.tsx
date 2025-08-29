import { TeamPlayer } from "../../../types/types";

interface TeamSquadProps {
  players: TeamPlayer[];
}

export const TeamSquad = ({ players }: TeamSquadProps) => {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4 text-brand-orange">Squad</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {players.map((player, idx) => (
          <div key={idx} className="p-4 bg-brand-card transition">
            <h3 className="font-semibold text-brand-white">{player.name}</h3>
            <p className="text-sm text-brand-yellow">{player.position}</p>
            <p className="text-xs text-brand-lightGray mt-1">
              Age: {player.age}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
