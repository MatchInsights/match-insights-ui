import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MatchDetails } from "../../types/types";
import FetchStatus from "../fetch-status/FetchStatus";

interface MatchDetailProps {
  fetchMatchDetails: (id: number) => Promise<MatchDetails>;
}

export default function MatchDetail({ fetchMatchDetails }: MatchDetailProps) {
  const { id } = useParams<{ id: string }>();
  const [match, setMatch] = useState<MatchDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetchMatchDetails(Number(id)).then((details) => {
      setMatch(details);
      setLoading(false);
    });
  }, [id]);

  if (loading)
    return <FetchStatus type="loading" message="Loading Match Details..." />;
  if (!match) return <FetchStatus type="error" message="Fetch Failed." />;

  const { homeTeam, awayTeam, date, venue, league, goals, score } = match;

  return (
    <div className="bg-brand-darkBg text-brand-white px-4 md:px-12 py-8 min-h-screen">
      <div className="max-w-6xl mx-auto bg-brand-card rounded-2xl shadow-2xl p-6 md:p-10 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="space-y-2">
            <h2 className="text-brand-orange text-3xl md:text-4xl font-extrabold">
              {homeTeam.name} <span className="text-brand-lightGray">vs</span>{" "}
              {awayTeam.name}
            </h2>
            <p
              className="text-brand-lightGray text-base md:text-lg"
              data-testid="league-link"
            >
              🏆{" "}
              {league?.id ? (
                <Link
                  to={`/league/${league.id}`}
                  className="hover:underline text-brand-lightGray hover:text-brand-orange"
                >
                  {league.name}
                </Link>
              ) : (
                "Unknown League"
              )}{" "}
              &mdash; {league.round}
            </p>

            <p className="text-brand-lightGray text-base md:text-lg">
              🏆 {league.name} &mdash; {league.round}
            </p>
            <p className="text-brand-lightGray text-base md:text-lg">
              📍 {venue.name}, {venue.city}
            </p>
            <p className="text-brand-yellow text-base md:text-lg">
              📅 {new Date(date).toLocaleString()}
            </p>
          </div>

          <div className="text-center md:text-right mt-6 md:mt-0">
            <p className="text-4xl md:text-5xl font-extrabold">
              {goals.home ?? "-"} : {goals.away ?? "-"}
            </p>
            <p className="text-brand-success text-base md:text-lg mt-1">
              {match.score.fulltime?.home != null ? "FT" : "Scheduled"}
            </p>
          </div>
        </div>

        <div className="bg-brand-navbar p-6 rounded-xl text-base text-brand-lightGray flex flex-col sm:flex-row justify-around items-center gap-4 sm:gap-0">
          <div className="text-center">
            <p className="text-brand-yellow font-semibold mb-1">Halftime</p>
            <p className="text-lg font-medium">
              {score.halftime?.home ?? "-"} : {score.halftime?.away ?? "-"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-brand-yellow font-semibold mb-1">Fulltime</p>
            <p className="text-lg font-medium">
              {score.fulltime?.home ?? "-"} : {score.fulltime?.away ?? "-"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-brand-navbar p-6 rounded-xl">
            <h3 className="text-brand-yellow text-xl font-semibold mb-2">
              Match Statistics
            </h3>
            <p className="text-brand-lightGray text-base">Coming soon...</p>
          </div>

          <div className="bg-brand-navbar p-6 rounded-xl">
            <h3 className="text-brand-yellow text-xl font-semibold mb-2">
              Other
            </h3>
            <p className="text-brand-lightGray text-base">Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
