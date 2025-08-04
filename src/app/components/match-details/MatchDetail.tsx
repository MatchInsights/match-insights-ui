import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MatchDetails, TeamForm } from "../../types/types";
import FetchStatus from "../fetch-status/FetchStatus";
import { DetailsMainCard } from "./details-main-card/DetailsMainCard";
import MatchScoreCard from "./match-score-card/MatchScoreCard";
import SubHeader from "../sub-header/SubHeader";
import LastFiveMatches from "./last-five-matches/LastFiveMatches";

interface MatchDetailProps {
  fetchMatchDetails: (id: number) => Promise<MatchDetails>;
  fetchLastFiveMatches: (
    homeTeamId: number,
    awayTeamId: number
  ) => Promise<TeamForm>;
}

export default function MatchDetail({
  fetchMatchDetails,
  fetchLastFiveMatches,
}: MatchDetailProps) {
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
    <div className="bg-brand-darkBg text-brand-white px-4 md:px-6 lg:px-12 py-8 min-h-screen w-full">
      <SubHeader title="Match Details" />

      <div
        className="
          grid 
          gap-6 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          auto-rows-min
          mt-8
        "
      >
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-2">
          <div className="bg-brand-navbar p-10 rounded-2xl shadow-md h-full w-full">
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
        </div>

        <div className="col-span-1">
          <div className="bg-brand-navbar p-10 rounded-2xl shadow-md h-full">
            <MatchScoreCard score={score} />
          </div>
        </div>

        <LastFiveMatches
          fetchLastFiveMatches={fetchLastFiveMatches}
          homeTeamId={homeTeam.id}
          homeTeam={homeTeam.name}
          awayTeam={awayTeam.name}
          awayTeamId={awayTeam.id}
        />

        <InfoCard title="Match Statistics" content="Coming soon..." />
        <InfoCard title="Lineups" content="Coming soon..." />
        <InfoCard title="Goals Timeline" content="Coming soon..." />
        <InfoCard title="Additional Insights" content="Coming soon..." />
      </div>
    </div>
  );
}

function InfoCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="bg-brand-navbar p-10 rounded-2xl shadow-md w-full min-h-[300px] flex flex-col justify-between">
      <h3 className="text-brand-yellow text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-brand-lightGray text-lg">{content}</p>
    </div>
  );
}
