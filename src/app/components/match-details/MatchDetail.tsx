import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MatchDetails } from "../../types/types";
import FetchStatus from "../fetch-status/FetchStatus";
import { DetailsMainCard } from "./details-main-card/DetailsMainCard";
import MatchScoreCard from "./match-score-card/MatchScoreCard";
import SubHeader from "../sub-header/SubHeader";

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
  if (!match) return <FetchStatus type="error" message="Match not found." />;

  const { homeTeam, awayTeam, date, venue, league, goals, score } = match;

  return (
    <div className="bg-brand-darkBg text-brand-white px-4 md:px-6 lg:px-12 py-8 min-h-screen">
      <SubHeader title={`Match Details`} />
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-brand-navbar p-6 rounded-2xl shadow-md w-full">
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="w-full md:w-3/4">
              <DetailsMainCard
                homeTeam={homeTeam}
                awayTeam={awayTeam}
                date={date}
                venue={venue}
                league={league}
                score={score}
                goals={goals}
              />
            </div>

            <div className="w-full md:w-1/4">
              <MatchScoreCard score={score} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoCard title="Match Statistics" content="Coming soon..." />
          <InfoCard title="Lineups" content="Coming soon..." />
          <InfoCard title="Goals Timeline" content="Coming soon..." />
        </div>
      </div>
    </div>
  );
}

// Future Info Card
function InfoCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="bg-brand-navbar p-6 rounded-2xl shadow-md w-full">
      <h3 className="text-brand-yellow text-xl font-semibold mb-2">{title}</h3>
      <p className="text-brand-lightGray text-base">{content}</p>
    </div>
  );
}
