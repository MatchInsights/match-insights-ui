import { useNavigate } from "react-router-dom";
import { FiRefreshCw } from "react-icons/fi";

interface SubHeaderProps {
  title: string;
  onRefresh: () => void;
  navigateBack: boolean;
}

export default function SubHeader({
  title,
  onRefresh,
  navigateBack,
}: SubHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full flex justify-between items-center flex-wrap gap-2 m-4 mr-6">
      <h2 className="text-brand-orange  hover:text-brand-white text-lg md:text-2xl m-4 font-semibold">
        {title}
      </h2>
      <div className="flex items-center gap-4">
        <button
          data-testid="refresh-icon"
          onClick={() => onRefresh()}
          className="p-2 rounded-full  flex items-center justify-center"
          title="Refresh"
        >
          <FiRefreshCw className="w-5 h-5 text-brand-yellow hover:text-brand-orange" />
        </button>

        {navigateBack && (
          <button
            onClick={handleBack}
            className="flex items-center gap-1 text-brand-orange hover:text-brand-yellow transition text-sm md:text-base"
          >
            <span data-testid="arrow-back-icon" className="text-5xl mr-1">
              &larr;
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
