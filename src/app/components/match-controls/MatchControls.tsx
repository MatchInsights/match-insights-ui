const statuses = [
  "NOT_STARTED",
  "TIME_TBD",
  "FIRST_HALF",
  "HALF_TIME",
  "SECOND_HALF",
  "EXTRA_TIME",
  "PENALTIES",
  "BREAK_TIME",
  "LIVE",
  "INTERRUPTED",
  "FULL_TIME",
  "AFTER_EXTRA_TIME",
  "AFTER_PENALTIES",
  "CANCELLED",
  "POSTPONED",
  "ABANDONED",
  "AWARDED",
  "WALKOVER",
  "SUSPENDED",
];

interface MatchControlsProps {
  status: string;
  setStatus: (status: string) => void;
  teamFilter: string;
  setTeamFilter: (team: string) => void;
  leagueFilter: string;
  setLeagueFilter: (league: string) => void;
}

const MatchControls = ({
  status,
  setStatus,
  teamFilter,
  setTeamFilter,
  leagueFilter,
  setLeagueFilter,
}: MatchControlsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="bg-white text-black p-2 rounded"
      >
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s === "All" ? "All Statuses" : s}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Filter by team name..."
        value={teamFilter}
        onChange={(e) => setTeamFilter(e.target.value)}
        className="bg-white text-black p-2 rounded"
      />

      <input
        type="text"
        placeholder="Filter by league..."
        value={leagueFilter}
        onChange={(e) => setLeagueFilter(e.target.value)}
        className="bg-white text-black p-2 rounded"
      />
    </div>
  );
};

export default MatchControls;
