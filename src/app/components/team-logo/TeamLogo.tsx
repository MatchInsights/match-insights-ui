import { useState } from "react";
import { FaShieldAlt } from "react-icons/fa";

interface TeamLogoProps {
  src?: string;
  customIconClass?: string;
  customImageClass?: string;
  customIconWrapperClass?: string;
}

const TeamLogo = ({
  src,
  customIconWrapperClass,
  customIconClass,
  customImageClass,
}: TeamLogoProps) => {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        data-testid="shield-fallback"
        className={
          customIconWrapperClass ??
          `w-5 h-5 bg-transparent rounded-full flex items-center justify-center`
        }
      >
        <FaShieldAlt
          className={customIconClass ?? "text-brand-lightGray text-md"}
        />
      </div>
    );
  }

  return (
    <img
      data-testid="team-logo"
      src={src}
      alt={""}
      className={customImageClass ?? `w-5 h-5 object-contain`}
      onError={() => setError(true)}
    />
  );
};

export default TeamLogo;
