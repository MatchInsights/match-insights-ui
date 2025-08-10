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
              <TeamStats
                homeTeamId={homeTeam.id}
                awayTeamId={awayTeam.id}
                homeTeamName={homeTeam.name}
                awayTeamName={awayTeam.name}
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
            ]}
            sectionId="r1-left"
          />

          <DetailsSection
            components={[
              <MatchScoreCard score={score} />,
              <HeadToHead
                homeTeamId={homeTeam.id}
                awayTeamId={awayTeam.id}
                apiService={apiService}
              />,
            ]}
            sectionId="r1-center"
          />

          <DetailsSection
            components={[
              <LeagueTeamAndPoints
                homeTeamId={homeTeam.id}
                awayTeamId={awayTeam.id}
                leagueId={league.id}
                apiService={apiService}
              />,
              <LastFiveMatches
                apiService={apiService}
                homeTeamId={homeTeam.id}
                homeTeam={homeTeam.name}
                awayTeam={awayTeam.name}
                awayTeamId={awayTeam.id}
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
