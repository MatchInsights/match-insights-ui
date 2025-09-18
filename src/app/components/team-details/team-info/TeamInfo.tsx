import { TeamDetails } from "../../../types/types"; 
import Logo from "../../logo/Logo";

interface TeamDetailsComponentProps {
  teamDetails: TeamDetails;
}

export const TeamInfo = ({ teamDetails }: TeamDetailsComponentProps) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-8 rounded bg-brand-card md:grid-cols-2 lg:grid-cols-3">
        <div className="m-2 p-2 text-center md:text-left">
          <Logo
            src={teamDetails.teamLogo}
            customImageClass="h-24 w-24 bg-transparent md:h-28 md:w-28"
            customIconWrapperClass="flex h-24 w-24 items-center justify-center bg-transparent md:h-28 md:w-28"
            customIconClass="h-2/3 w-2/3 text-brand-lightGray"
          />
          <h1 className="text-lg font-bold uppercase text-brand-yellow">
            {teamDetails.teamName}
          </h1>
          <p className="text-xs font-semibold uppercase text-brand-white">
            {teamDetails.teamCountry} • Founded{" "}
            {teamDetails.teamFounded > 0 ? teamDetails.teamFounded : "Unknown"}
          </p>
        </div>
      </div>

      <div className="rounded bg-brand-card p-6">
        <h2 className="mb-2 text-lg font-semibold text-brand-white">Venue</h2>
        <p className="text-sm font-semibold uppercase text-brand-yellow">
          {teamDetails.venueName}
        </p>
        <p className="text-xs font-semibold uppercase text-brand-lightGray">
          {teamDetails.venueCity}
        </p>
        <p className="mt-1 text-xs font-semibold uppercase text-brand-green">
          Capacity:{" "}
          {teamDetails.venueCapacity > 0
            ? teamDetails.venueCapacity
            : "Unknown"}
        </p>
      </div>

      <div className="rounded bg-brand-card p-6">
        <h2 className="mb-2 text-lg font-semibold text-brand-white">Coach</h2>
        <p className="text-sm font-semibold uppercase text-brand-yellow">
          {teamDetails.coachName}
        </p>
        <p className="text-xs font-semibold uppercase text-brand-lightGray">
          {teamDetails.coachAge > 0
            ? `${teamDetails.coachAge} years old`
            : "Unknown Age"}
        </p>
      </div>
    </>
  );
};

export default TeamInfo;
