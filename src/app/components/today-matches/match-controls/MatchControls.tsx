export const statuses: StatusOption[] = [
  {
    key: "NOT_STARTED",
    value: "NOT STARTED",
  },
  {
    key: "TIME_TBD",
    value: "TBD",
  },
  {
    key: "FIRST_HALF",
    value: "FIRST HALF",
  },
  {
    key: "HALF_TIME",
    value: "HALF TIME",
  },
  {
    key: "SECOND_HALF",
    value: "SECOND HALF",
  },
  {
    key: "EXTRA_TIME",
    value: "EXTRA TIME",
  },
  {
    key: "PENALTIES",
    value: "PENALTIES",
  },
  {
    key: "BREAK_TIME",
    value: "BREAK TIME",
  },

  {
    key: "INTERRUPTED",
    value: "INTERRUPTED",
  },
  {
    key: "FULL_TIME",
    value: "FULL TIME",
  },
  {
    key: "CANCELLED",
    value: "CANCELLED",
  },

  {
    key: "POSTPONED",
    value: "POSTPONED",
  },
  {
    key: "ABANDONED",
    value: "ABANDONED",
  },
  {
    key: "SUSPENDED",
    value: "SUSPENDED",
  },
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
}

const MatchControls = ({
  status,
  setStatus,
  teamFilter,
  setTeamFilter,
}: MatchControlsProps) => {
  return (
    <div className="flex flex-col justify-left items-left text-left md:flex-row  gap-4 m-8">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="bg-white text-black p-4 rounded w-full md:w-auto"
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
        className="bg-white text-black p-4 rounded w-full md:w-auto"
      />
    </div>
  );
};

export default MatchControls;
