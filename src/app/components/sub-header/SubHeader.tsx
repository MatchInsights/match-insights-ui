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
    <div className="w-full flex items-center justify-between m-2">
      <div className="flex items-center gap-4">
        <h2 className="text-brand-orange hover:text-brand-white text-lg md:text-2xl font-semibold">
          {title}
        </h2>

        <button
          data-testid="refresh-icon"
          onClick={onRefresh}
          className="p-2 rounded-full flex items-center justify-center hover:bg-brand-yellow hover:text-brand-darkBg"
          title="Refresh"
        >
          <FiRefreshCw className="w-5 h-5" />
        </button>

        {navigateBack && (
          <button
            onClick={handleBack}
            className="p-2 rounded-full flex items-center justify-center hover:bg-brand-yellow hover:text-brand-darkBg"
            title="Go back"
          >
            <span data-testid="arrow-back-icon" className="text-4xl">
              &larr;
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
