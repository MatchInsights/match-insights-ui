import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MatchDetails } from "../../types/types";
import FetchStatus from "../fetch-status/FetchStatus";
import { DetailsMainCard } from "./details-main-card/DetailsMainCard";
import MatchScoreCard from "./match-score-card/MatchScoreCard";
import LastFiveMatches from "./last-five-matches/LastFiveMatches";
import HeadToHead from "./h2h/HeadToHead";
import TeamStats from "./team-stats/TeamStats";
import { DetailsSection } from "./details-section/DetailsSection";
import { ApiService } from "../../services/apiService";
import MatchOdds from "./match-odds/MatchOdds";

interface MatchDetailProps {
  apiService: ApiService;
}

export default function MatchDetail({ apiService }: MatchDetailProps) {
  const { id } = useParams<{ id: string }>();
  const [match, setMatch] = useState<MatchDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    apiService
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
    <div className="mt-8 space-y-6">
      {/* Row 0 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
        {/* Left */}
        <div data-testid="top-left" className="lg:col-span-2">
          <DetailsSection
            components={[
              <DetailsMainCard
                homeTeam={homeTeam}
                awayTeam={awayTeam}
                date={date}
                venue={venue}
                league={league}
                score={score}
                goals={goals}
                apiService={apiService}
              />,
            ]}
          />
        </div>

        {/* Right */}
        <DetailsSection
          components={[
            <MatchScoreCard score={score} />,
            <LastFiveMatches
              apiService={apiService}
              homeTeamId={homeTeam.id}
              homeTeam={homeTeam.name}
              awayTeam={awayTeam.name}
              awayTeamId={awayTeam.id}
            />,
          ]}
          cardClassName="flex flex-col m-12 items-center justify-center space-y-4"
          sectionId="top-right"
        />
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
        {/* Left */}
        <DetailsSection
          components={[
            <HeadToHead
              homeTeamId={homeTeam.id}
              awayTeamId={awayTeam.id}
              apiService={apiService}
            />,
            <TeamStats
              homeTeamId={homeTeam.id}
              awayTeamId={awayTeam.id}
              leagueId={league.id}
              homeTeamName={homeTeam.name}
              awayTeamName={awayTeam.name}
              apiService={apiService}
            />,
            <InfoCard title="Match Statistics" content="Coming soon..." />,
            <InfoCard title="Lineups" content="Coming soon..." />,
          ]}
          sectionId="r1-left"
        />

        {/* Center */}
        <DetailsSection
          components={[
            <TeamStats
              homeTeamId={homeTeam.id}
              awayTeamId={awayTeam.id}
              homeTeamName={homeTeam.name}
              awayTeamName={awayTeam.name}
              apiService={apiService}
            />,
            <InfoCard title="Goals Timeline" content="Coming soon..." />,
            <InfoCard title="Additional Insights" content="Coming soon..." />,
          ]}
          sectionId="r1-center"
        />

        {/* Right */}
        <div className="space-y-6">
          <DetailsSection
            components={[
              <MatchOdds fixtureId={Number(id)} apiService={apiService} />,
            ]}
            sectionId="r1-right"
          />
        </div>
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
