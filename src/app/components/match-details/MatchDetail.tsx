import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MatchDetails } from "../../types/types";
import FetchStatus from "../fetch-status/FetchStatus";
import { DetailsMainCard } from "./details-main-card/DetailsMainCard";

import HeadToHead from "./h2h/HeadToHead";
import TeamStats from "./team-stats/TeamStats";
import { DetailsSection } from "./details-section/DetailsSection";
import { ApiService } from "../../services/apiService";
import MatchOdds from "./match-odds/MatchOdds";
import SubHeader from "../sub-header/SubHeader";
import MatchScoreCard from "./match-score-card/MatchScoreCard";
import { LeagueTeamAndPoints } from "./ranks-and-points/LeagueTeamAndPoints";
import LastFiveMatches from "./last-five-matches/LastFiveMatches";
import MatchEvents from "../last-five-events/MatchEvents";
import TeamsRestStatusComponent from "./teams-rest-status/TeamRestStatus";
import TeamsScorePerformanceComponent from "./teams-score-performance/TeamsScorePerformance";
import OddsWinnerFeelingComponent from "./odds-winner-feeling/OddsWinnerFeeling";

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
    <div className="text-brand-white p-4 md:p-6 rounded-2xl  mt-6 mx-2 md:mx-8">
      <SubHeader title="Match Details" />
      <div className="mt-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
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
              />,
              <TeamsScorePerformanceComponent
                homeTeamId={homeTeam.id}
                awayTeamId={awayTeam.id}
                homeTeam={homeTeam.name}
                awayTeam={awayTeam.name}
                leagueId={league.id}
                apiService={apiService}
              />,
              <HeadToHead
                homeTeamId={homeTeam.id}
                awayTeamId={awayTeam.id}
                apiService={apiService}
              />,
              <TeamStats
                title="H2H Stats"
                homeTeamId={homeTeam.id}
                awayTeamId={awayTeam.id}
                homeTeamName={homeTeam.name}
                awayTeamName={awayTeam.name}
                apiService={apiService}
              />,
              <TeamStats
                title="Both teams Season Stats"
                homeTeamId={homeTeam.id}
                awayTeamId={awayTeam.id}
                leagueId={league.id}
                homeTeamName={homeTeam.name}
                awayTeamName={awayTeam.name}
                apiService={apiService}
              />,
            ]}
            sectionId="r1-left"
          />

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
              <MatchEvents
                title={`${homeTeam.name} Last Five Matches Summary`}
                teamId={homeTeam.id}
                apiService={apiService}
              />,
              <MatchEvents
                title={`${awayTeam.name} Last Five Matches Summary`}
                teamId={awayTeam.id}
                apiService={apiService}
              />,
              <LeagueTeamAndPoints
                homeTeamId={homeTeam.id}
                awayTeamId={awayTeam.id}
                leagueId={league.id}
                apiService={apiService}
              />,
            ]}
            sectionId="r1-center"
          />

          <DetailsSection
            components={[
              <OddsWinnerFeelingComponent
                apiService={apiService}
                homeTeam={homeTeam.name}
                awayTeam={awayTeam.name}
                fixtureId={match?.id ?? Number(id)}
              />,
              <TeamsRestStatusComponent
                apiService={apiService}
                homeTeam={homeTeam.name}
                homeTeamId={homeTeam.id}
                awayTeam={awayTeam.name}
                awayTeamId={awayTeam.id}
                fixtureDate={date}
              />,
              <MatchOdds fixtureId={Number(id)} apiService={apiService} />,
            ]}
            sectionId="r1-right"
          />
        </div>
      </div>
    </div>
  );
}
