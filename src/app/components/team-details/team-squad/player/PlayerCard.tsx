import { PlayerSummary } from "../../../../types/types";

interface PlayerCardProps {
  playerSummary: PlayerSummary;
}

export const PlayerCard = ({ playerSummary }: PlayerCardProps) => {
  return (
    <>
      <div
        key={playerSummary.name}
        className="overflow-hidden transition duration-500 ease-in-out transform hover:-translate-y-5 hover:shadow-2xl h-60 w-60 md:w-60 cursor-pointer m-auto"
      >
        <div className="w-full block h-full">
          <div className="w-full p-4">
            <p className="text-brand-yellow text-sm font-medium">
              {playerSummary.name}
            </p>
            <p className="text-brand-white text-xs font-medium">
              <span>Age: {playerSummary.age}</span>
            </p>
            <p className="text-brand-lightGray  font-light text-xs">
              <span>Position: {playerSummary.position}</span>
            </p>
            <p className="text-brand-lightGray  font-light text-xs">
              <span>Height: {playerSummary.height}</span>
            </p>
            <p className="text-brand-lightGray  font-light text-xs">
              <span>Weight: {playerSummary.weight}</span>
            </p>
            <div className="flex flex-wrap justify-starts items-center py-3 border-b-2 font-medium">
              <span className="m-1 px-1 py-1 rounded bg-brand-royalblue text-brand-white text-xs">
                <span className="text-brand-orange">#</span>goals:{" "}
                {playerSummary.goals}
              </span>
              <span className="m-1 px-1 py-1 rounded bg-brand-royalblue text-brand-white text-xs">
                <span className="text-brand-orange">#</span> yellow-cards:{" "}
                {playerSummary.yellowCards}
              </span>
              <span className="m-1 px-1 py-1 rounded bg-brand-royalblue text-brand-white text-xs">
                <span className="text-brand-orange">#</span>red-cards:{" "}
                {playerSummary.redCards}
              </span>
              <span className="m-1 px-1 py-1 rounded bg-brand-royalblue text-brand-white text-xs">
                <span className="text-brand-orange">#</span>penalties-scored:{" "}
                {playerSummary.penaltiesScored}
              </span>
              <span className="m-1 px-1 py-1 rounded bg-brand-royalblue text-brand-white text-xs">
                <span className="text-brand-orange">#</span>penalties-saved:{" "}
                {playerSummary.penaltiesSaved}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
