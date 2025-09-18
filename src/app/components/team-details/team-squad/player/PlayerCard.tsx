import { PlayerSummary } from "../../../../types/types";

interface PlayerCardProps {
  playerSummary: PlayerSummary;
}

export const PlayerCard = ({ playerSummary }: PlayerCardProps) => {
  return (
    <div
      key={playerSummary.name}
      className="m-auto w-60 cursor-pointer overflow-hidden transform transition duration-500 ease-in-out hover:-translate-y-5 hover:shadow-2xl md:w-60"
    >
      <div className="block h-full w-full bg-brand-navbar">
        <div className="w-full p-4">
          <p className="flex flex-col text-xs font-semibold uppercase leading-5 text-brand-yellow">
            {playerSummary.name}
          </p>
          <p className="text-xs font-medium text-brand-white">
            <span>Age: {playerSummary.age}</span>
          </p>
          <p className="text-xs font-light text-brand-lightGray">
            <span>Position: {playerSummary.position}</span>
          </p>
          <p className="text-xs font-light text-brand-lightGray">
            <span>Height: {playerSummary.height}</span>
          </p>
          <p className="text-xs font-light text-brand-lightGray">
            <span>Weight: {playerSummary.weight}</span>
          </p>

          <div className="flex flex-wrap items-center border-b-2 py-3 font-medium">
            <span className="m-1 rounded bg-brand-royalblue px-1 py-1 text-xs text-brand-white">
              <span className="text-brand-orange">#</span> goals: {playerSummary.goals}
            </span>
            <span className="m-1 rounded bg-brand-royalblue px-1 py-1 text-xs text-brand-white">
              <span className="text-brand-orange">#</span> yellow-cards: {playerSummary.yellowCards}
            </span>
            <span className="m-1 rounded bg-brand-royalblue px-1 py-1 text-xs text-brand-white">
              <span className="text-brand-orange">#</span> red-cards: {playerSummary.redCards}
            </span>
            <span className="m-1 rounded bg-brand-royalblue px-1 py-1 text-xs text-brand-white">
              <span className="text-brand-orange">#</span> penalties-scored: {playerSummary.penaltiesScored}
            </span>
            <span className="m-1 rounded bg-brand-royalblue px-1 py-1 text-xs text-brand-white">
              <span className="text-brand-orange">#</span> penalties-saved: {playerSummary.penaltiesSaved}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
