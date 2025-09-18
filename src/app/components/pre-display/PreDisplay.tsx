import { FiRefreshCw } from "react-icons/fi";

interface PreDisplayProps {
  child: React.ReactNode;
  title: string;
  titleClass?: string;
  onRefresh: () => void;
}

const PreDisplay = ({
  child,
  title,
  titleClass,
  onRefresh,
}: PreDisplayProps) => {
  return (
    <div className="w-full p-4 sm:p-6 md:p-8 lg:p-10 mb-6">
      <div className="flex items-center w-full focus:outline-none">
        <h3
          className={
            titleClass ?? "flex-grow text-brand-white text-2xl font-bold"
          }
        >
          {title}
        </h3>
        <div
          className={`text-brand-white text-base select-none m-1 flex items-center space-x-2`}
        >
          <button
            data-testid="refresh-icon"
            onClick={() => onRefresh()}
            className="animate-spin [animation-duration:3s] w-5 h-5 m-2 p-0 items-center text-center text-base rounded-full hover:text-brand-yellow flex items-center justify-center"
            title="Refresh"
          >
            <FiRefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>
      {
        <div id="collapsible-content" className="mt-4">
          {child}
        </div>
      }
    </div>
  );
};

export default PreDisplay;
