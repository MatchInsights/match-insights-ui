interface StatusTileProps {
  isUp: boolean;
  isFlat: boolean;
  status: string;
  description: string;
}

export const ArrowStatusTile = ({
  isUp,
  isFlat,
  status,
  description,
}: StatusTileProps) => {
  const arrowColor = () => {
    if (isUp && !isFlat) return "bg-brand-success text-black";
    if (!isUp && !isFlat) return "bg-brand-danger text-white";
    return "bg-brand-yellow text-black";
  };

  return (
    <div className="grid grid-cols-1 w-full">
      <div className="flex flex-row items-left justify-left rounded">
        <div
          data-testid="arrow-icon"
          className={`flex flex-shrink-0 items-center m-2 justify-center h-10 w-10 rounded
            ${arrowColor()}`}
        >
          {isUp && !isFlat && (
            <svg
              className="w-6 h-6 fill-current "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" />
            </svg>
          )}
          {!isUp && !isFlat && (
            <svg
              className="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" />
            </svg>
          )}

          {!isUp && isFlat && (
            <svg
              className="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 12.707a1 1 0 010-1.414l3-3a1 1 0 111.414 1.414L7.414 11H16.586l-1.293-1.293a1 1 0 111.414-1.414l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 13H7.414l1.293 1.293a1 1 0 11-1.414 1.414l-3-3z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="flex-grow flex flex-col m-2">
          <span className="text-md ml-1 font-bold text-brand-orange">
            {status}
          </span>
          <div className="flex items-center justify-between">
            <span className="text-brand-white text-xs">{description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
