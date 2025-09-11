import { LeagueTeamInfo } from "../../types/league-types";

interface LeagueTableProps {
  teams: LeagueTeamInfo[];
}

export const LeagueTable = ({ teams }: LeagueTableProps) => {
  return (
    <div className="overflow-x-auto bg-gray-900 p-4 rounded-lg shadow-lg">
      <table className="w-full table-auto border-collapse text-sm md:text-sm">
        <thead>
          <tr className="bg-brand-royalblue -800 text-white text-sm">
            <th className="p-2 text-center border border-white">#</th>
            <th className="p-2 text-left border border-white">Team</th>
            <th className="p-2 text-center border border-white">Pts</th>
            <th className="p-2 text-center border border-white">P</th>
            <th className="p-2 text-center border border-white">W</th>
            <th className="p-2 text-center border border-white">D</th>
            <th className="p-2 text-center border border-white">L</th>
            <th className="p-2 text-center border border-white">GF</th>
            <th className="p-2 text-center border border-white">GA</th>
            <th className="p-2 text-center border border-white">Form</th>
          </tr>
        </thead>
        <tbody className="text-white text-sm">
          {teams.map((team: LeagueTeamInfo) => (
            <tr
              key={team.rank}
              className="border border-white even:bg-gray-800 odd:bg-gray-900 hover:bg-gray-700 transition-colors"
            >
              {/* POSICIÓN EN NEGRITA */}
              <td className="text-center py-2 border border-white font-bold">
                {team.rank}
              </td>

              {/* EQUIPO EN NEGRITA */}
              <td className="flex items-center gap-2 py-2 border border-white font-bold">
                <img
                  src={team.logo}
                  alt={team.teamName}
                  className="w-5 h-5 md:w-6 md:h-6"
                />
                <span>{team.teamName}</span>
              </td>

              {/* PUNTOS EN NEGRITA */}
              <td className="text-center border border-white font-bold">
                {team.points}
              </td>

              <td className="text-center border border-white">{team.played}</td>
              <td className="text-center border border-white">{team.won}</td>
              <td className="text-center border border-white">{team.draw}</td>
              <td className="text-center border border-white">{team.lost}</td>
              <td className="text-center border border-white">{team.goalsFor}</td>
              <td className="text-center border border-white">{team.goalsAgainst}</td>
              <td className="border border-white py-2">
                <div className="flex justify-center items-center gap-1">
                  {team.form.split("").map((f, index) => {
                    let bgColor = "";
                    let textColor = "text-black";

                    if (f === "W") bgColor = "bg-green-500";
                    else if (f === "D") bgColor = "bg-yellow-400";
                    else if (f === "L") bgColor = "bg-red-500";

                    return (
                      <span
                        key={index}
                        className={`w-4 h-4 md:w-5 md:h-5 ${bgColor} flex items-center justify-center rounded-sm text-xs md:text-sm font-bold ${textColor}`}
                        title={f}
                      >
                        {f}
                      </span>
                    );
                  })}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
