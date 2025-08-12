import { useState } from "react";
import { FaShieldAlt } from "react-icons/fa";

const TeamLogo = ({ src }: { src?: string }) => {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="w-10 h-10 md:w-14 md:h-14 bg-transparent rounded-full flex items-center justify-center">
        <FaShieldAlt className="text-brand-lightGray text-lg md:text-xl" />
      </div>
    );
  }

  return (
    <img
      data-testid="team-logo"
      src={src}
      alt={""}
      className="w-10 h-10 md:w-14 md:h-14 object-contain"
      onError={() => setError(true)}
    />
  );
};

export default TeamLogo;
