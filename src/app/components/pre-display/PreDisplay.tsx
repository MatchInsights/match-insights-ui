import { FiRefreshCw } from "react-icons/fi";

interface PreDisplayProps {
  child: React.ReactNode;
  title: string;
  expanded: boolean;
  titleClass?: string;
  setExpanded: (isExpanded: boolean) => void;
  banner?: string;
  onRefresh: () => void;
}

const PreDisplay = ({
  child,
  title,
  expanded,
  setExpanded,
  banner,
  titleClass,
  onRefresh,
}: PreDisplayProps) => {
  return (
    <div className="bg-brand-navbar rounded-4xl shadow-md w-full p-4 sm:p-6 md:p-8 lg:p-10 mb-6">
      <div className="flex items-center w-full focus:outline-none">
        {banner && (
          <img
            src={banner}
            alt={`${title} icon`}
            className="w-6 h-6 mr-3 object-contain"
          />
        )}
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
          {expanded && (
            <button
              data-testid="refresh-icon"
              onClick={() => onRefresh()}
              className="w-5 h-5 m-2 p-0 items-center text-center text-base rounded-full hover:text-brand-orange flex items-center justify-center"
              title="Refresh"
            >
              <FiRefreshCw className="w-5 h-5" />
            </button>
          )}
          <span
            data-testid="expand-icon"
            className="w-5 h-5  m-2 mb-4 p-0 items-center text-center text-base  hover:text-brand-yellow "
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "▲" : "▼"}
          </span>
        </div>
      </div>
      {expanded && (
        <div id="collapsible-content" className="mt-4">
          {child}
        </div>
      )}
    </div>
  );
};

export default PreDisplay;
