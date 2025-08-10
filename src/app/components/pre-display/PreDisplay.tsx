import React from "react";

interface PreDisplayProps {
  child: React.ReactNode;
  title: string;
  expanded: boolean;
  titleClass?: string;
  setExpanded: (isExpanded: boolean) => void;
  banner?: string;
}

const PreDisplay = ({
  child,
  title,
  expanded,
  setExpanded,
  banner,
  titleClass,
}: PreDisplayProps) => {
  return (
    <div className="bg-brand-navbar rounded-2xl shadow-md w-full p-4 sm:p-6 md:p-8 lg:p-10 mb-6">
      <button
        className="flex items-center w-full focus:outline-none"
        onClick={() => setExpanded(!expanded)}
      >
        {banner && (
          <img
            src={banner}
            alt={`${title} icon`}
            className="w-6 h-6 mr-3 object-contain"
          />
        )}
        <h3
          className={
            titleClass ?? "flex-grow text-brand-white text-base font-bold"
          }
        >
          {title}
        </h3>
        <span className="text-brand-white text-base select-none m-1">
          {expanded ? "▲" : "▼"}
        </span>
      </button>
      {expanded && (
        <div id="collapsible-content" className="mt-4">
          {child}
        </div>
      )}
    </div>
  );
};

export default PreDisplay;
