import { LeaguesMenu } from "../../leagues-menu/LeaguesMenu";
import { LeagueBasicInfo } from "../../../types/league-groups";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { ApiService } from "../../../services/apiService";

export const statuses: StatusOption[] = [
  { key: "NOT_STARTED", value: "NOT STARTED" },
  { key: "TIME_TBD", value: "TBD" },
  { key: "FIRST_HALF", value: "FIRST HALF" },
  { key: "HALF_TIME", value: "HALF TIME" },
  { key: "SECOND_HALF", value: "SECOND HALF" },
  { key: "EXTRA_TIME", value: "EXTRA TIME" },
  { key: "PENALTIES", value: "PENALTIES" },
  { key: "BREAK_TIME", value: "BREAK TIME" },
  { key: "INTERRUPTED", value: "INTERRUPTED" },
  { key: "FULL_TIME", value: "FULL TIME" },
  { key: "CANCELLED", value: "CANCELLED" },
  { key: "POSTPONED", value: "POSTPONED" },
  { key: "ABANDONED", value: "ABANDONED" },
  { key: "SUSPENDED", value: "SUSPENDED" },
];

interface StatusOption {
  key: string;
  value: string;
}

interface MatchControlsProps {
  status: string;
  setStatus: (status: string) => void;
  teamFilter: string;
  setTeamFilter: (team: string) => void;
  selectedLeague: LeagueBasicInfo | null;
  setSelectedLeague: (league: LeagueBasicInfo | null) => void;
  apiService: ApiService;
}

const MatchControls = ({
  status,
  setStatus,
  teamFilter,
  setTeamFilter,
  selectedLeague,
  setSelectedLeague,
  apiService,
}: MatchControlsProps) => {
  return (
    <div className="p-4 flex justify-between items-center shadow-md">
      <div className="flex flex-row flex-wrap items-center gap-4">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-white text-black p-2 rounded w-auto"
        >
          {statuses.map((statusOption) => (
            <option key={statusOption.key} value={statusOption.key}>
              {statusOption.value}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Filter by team name..."
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
          className="bg-white text-black p-2 rounded w-auto"
        />

        {!selectedLeague && (
          <div className="p-2 text-brand-yellow rounded w-auto flex items-center">
            <span>ALL LEAGUES</span>
          </div>
        )}

        {selectedLeague && (
          <div className="flex items-center gap-2 text-brand-yellow uppercase p-2 rounded">
            <Link
              data-testid="league-link"
              to={`/league/${selectedLeague.id}`}
              className="hover:underline hover:text-brand-orange flex items-center gap-1"
            >
              🏆 {selectedLeague.name} &gt;
            </Link>
            <X
              className="cursor-pointer m-0 text-brand-white hover:text-brand-danger"
              onClick={() => setSelectedLeague(null)}
              data-testid="remove-league-icon"
            />
          </div>
        )}
      </div>

      <LeaguesMenu setLeague={setSelectedLeague} apiService={apiService} />
    </div>
  );
};

export default MatchControls;