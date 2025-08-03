import { Score } from "../../../types/types";

interface MatchScoreCardProps {
  score: Score;
}

const MatchScoreCard = ({ score }: MatchScoreCardProps) => {
  return (
    <div className="bg-brand-navbar rounded-xl p-6 w-full shadow text-center text-brand-white flex flex-col gap-4 justify-center items-center">
      <div>
        <p className="text-brand-yellow font-semibold text-lg">Halftime</p>
        <p className="text-xl font-bold mt-2 text-center text-brand-yellow">
          {score.halftime?.home ?? "-"} : {score.halftime?.away ?? "-"}
        </p>
      </div>
      <div>
        <p className="text-brand-yellow font-semibold text-lg">Fulltime</p>
        <p className="text-xl font-bold mt-2  text-brand-yellow">
          {score.fulltime?.home ?? "-"} : {score.fulltime?.away ?? "-"}
        </p>
      </div>
    </div>
  );
};

export default MatchScoreCard;
