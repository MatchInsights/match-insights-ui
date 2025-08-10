import { Score } from "../../../types/types";

interface MatchScoreCardProps {
  score: Score;
}

const MatchScoreCard = ({ score }: MatchScoreCardProps) => {
  return (
    <div className="w-full h-full flex flex-col gap-8">
      <div className="bg-brand-navbar rounded-xl  text-center text-brand-white flex flex-col gap-4 justify-center items-center p-6 w-full">
        <p className="text-brand-orange font-semibold text-lg">Halftime</p>
        <p className="text-xl font-bold text-brand-white">
          {score.halftime?.home ?? "-"} : {score.halftime?.away ?? "-"}
        </p>
      </div>

      <div className="bg-brand-navbar rounded-xl  text-center text-brand-white flex flex-col gap-4 justify-center items-center p-6 w-full">
        <p className="text-brand-orange font-semibold text-lg">Fulltime</p>
        <p className="text-xl font-bold text-brand-white">
          {score.fulltime?.home ?? "-"} : {score.fulltime?.away ?? "-"}
        </p>
      </div>
    </div>
  );
};

export default MatchScoreCard;
