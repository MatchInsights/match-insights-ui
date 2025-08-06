import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MatchDetails, MatchDetailsFetchFunctions } from "../../types/types";
import FetchStatus from "../fetch-status/FetchStatus";
import { DetailsMainCard } from "./details-main-card/DetailsMainCard";
import MatchScoreCard from "./match-score-card/MatchScoreCard";
import SubHeader from "../sub-header/SubHeader";
import LastFiveMatches from "./last-five-matches/LastFiveMatches";
import HeadToHead from "./h2h/HeadToHead";
import TeamStats from "./team-stats/TeamStats";

interface MatchDetailProps {
  fetchFunctions: MatchDetailsFetchFunctions;
}

export default function MatchDetail({ fetchFunctions }: MatchDetailProps) {
  const { id } = useParams<{ id: string }>();
  const [match, setMatch] = useState<MatchDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetchFunctions
      .fetchMatchDetails(Number(id))
      .then((details) => {
        setMatch(details);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setMatch(null);
      });
  }, [id]);

  if (loading)
    return <FetchStatus type="loading" message="Loading Match Details..." />;

  if (!loading && !match)
    return <FetchStatus type="error" message="Match not found." />;

  const { homeTeam, awayTeam, date, venue, league, goals, score } =
    match as MatchDetails;

  return (
    <div className="bg-brand-darkBg text-brand-white px-4 md:px-6 lg:px-12 py-8 min-h-screen w-full">
      <SubHeader title="Match Details" />

      <div
        className="
          grid 
          gap-6 
          grid-cols-1 
          lg:grid-cols-3 
          mt-8
        "
      >
        <div className="lg:col-span-2">
          <div
            data-testid="main-card"
            className="bg-brand-navbar rounded-2xl shadow-md w-full p-4 sm:p-6 md:p-8 lg:p-10"
          >
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

        <div className="bg-brand-navbar rounded-2xl shadow-md w-full p-2 sm:p-4 md:p-4 lg:p-2 flex flex-col sm:flex-row items-center justify-center gap-2">
          <div
            data-testid="score-card"
            className="w-full sm:w-1/2 flex justify-center"
          >
            <MatchScoreCard score={score} />
          </div>
          <div
            data-testid="last-five-card"
            className="w-full sm:w-1/2 flex justify-center"
          >
            <LastFiveMatches
              fetchLastFiveMatches={fetchFunctions.fetchLastFiveMatches}
              homeTeamId={homeTeam.id}
              homeTeam={homeTeam.name}
              awayTeam={awayTeam.name}
              awayTeamId={awayTeam.id}
            />
          </div>
        </div>

        <div
          data-testid="last-five-info"
          className="bg-brand-navbar rounded-2xl shadow-md w-full p-4 sm:p-6 md:p-8 lg:p-10"
        >
          <HeadToHead
            homeTeamId={homeTeam.id}
            awayTeamId={awayTeam.id}
            fetchHeadToHead={fetchFunctions.fetchHeadToHead}
          />
        </div>

        <div
          data-testid="h2h-stats"
          className="bg-brand-navbar rounded-2xl shadow-md w-full p-4 sm:p-6 md:p-8 lg:p-10"
        >
          <TeamStats
            homeTeamId={homeTeam.id}
            awayTeamId={awayTeam.id}
            homeTeamName={homeTeam.name}
            awayTeamName={awayTeam.name}
            fetchH2HTeamStats={fetchFunctions.fetchH2HStats}
          />
        </div>

        <div
          data-testid="season-stats"
          className="bg-brand-navbar rounded-2xl shadow-md w-full p-4 sm:p-6 md:p-8 lg:p-10"
        >
          <TeamStats
            homeTeamId={homeTeam.id}
            awayTeamId={awayTeam.id}
            leagueId={league.id}
            homeTeamName={homeTeam.name}
            awayTeamName={awayTeam.name}
            fetchSeasonTeamStats={fetchFunctions.fetchSeasonStats}
          />
        </div>

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
    <div className="bg-brand-navbar rounded-2xl shadow-md w-full p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-between">
      <h3 className="text-brand-yellow text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-brand-lightGray text-lg">{content}</p>
    </div>
  );
}
