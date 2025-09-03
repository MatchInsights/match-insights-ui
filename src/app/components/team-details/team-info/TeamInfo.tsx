import { TeamDetails } from "../../../types/types";
import TeamLogo from "../../team-logo/TeamLogo";

interface TeamDetailsComponentProps {
  teamDetails: TeamDetails;
}

export const TeamInfo = ({ teamDetails }: TeamDetailsComponentProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="text-center md:text-left m-2 p-2">
          <TeamLogo
            src={teamDetails.teamLogo}
            customImageClass="w-24 h-24 md:w-28 md:h-28  bg-transparent "
            customIconWrapperClass="w-24 h-24 md:w-28 md:h-28  bg-transparent flex items-center justify-center"
            customIconClass="w-2/3 h-2/3 text-brand-lightGray"
          />
          <h1 className="text-lg font-bold text-brand-yellow">
            {teamDetails.teamName}
          </h1>
          <p className="text-brand-lightGray text-sm">
            {teamDetails.teamCountry} • Founded{" "}
            {teamDetails.teamFounded > 0 ? teamDetails.teamFounded : "Unknown"}
          </p>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-lg font-semibold mb-2 text-brand-orange">Venue</h2>
        <p className="text-md font-medium">{teamDetails.venueName}</p>
        <p className="text-sm text-brand-lightGray">{teamDetails.venueCity}</p>
        <p className="text-sm text-brand-yellow mt-1">
          Capacity:{" "}
          {teamDetails.venueCapacity > 0
            ? teamDetails.venueCapacity
            : "Unknown"}
        </p>
      </div>

      <div className="p-6 ">
        <h2 className="text-lg font-semibold mb-2 text-brand-orange">Coach</h2>
        <p className="text-md font-medium">{teamDetails.coachName}</p>
        <p className="text-sm text-brand-lightGray">
          {teamDetails.coachAge > 0
            ? `${teamDetails.coachAge} years
          old`
            : "Unknown Age"}
        </p>
      </div>
    </>
  );
};

export default TeamInfo;
