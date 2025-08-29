import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MatchDetails } from "../../types/types";
import NoData from "../../components/no-data/NoData";
import { DetailsMainInfo } from "../../components/match-details/details-main-info/DetailsMainCard";

import HeadToHead from "../../components/match-details/h2h/HeadToHead";

import { ApiService } from "../../services/apiService";
import MatchOdds from "../../components/match-details/match-odds/MatchOdds";
import SubHeader from "../../components/sub-header/SubHeader";
import QuickInfo from "../../components/match-details/quick-info/QuickInfo";
import SummariesAndFeeling from "../../components/match-details/summaries-and-feeling/SummariesAndFeeling";
import SeasonStats from "../../components/match-details/team-stats/season-stats/SeasonStats";
import H2hStats from "../../components/match-details/team-stats/h2h-stats/H2hStats";

interface MatchDetailProps {
  apiService: ApiService;
}

export default function MatchDetail({ apiService }: MatchDetailProps) {
  const { id } = useParams<{ id: string }>();
  const [match, setMatch] = useState<MatchDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
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
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) return <NoData displayedMessage="Fetching Match Details." />;

  if (!loading && !match)
    return (
      <div>
        <SubHeader
          title="Match Details"
          navigateBack={true}
          onRefresh={fetchData}
          displayAnimation={false}
        />
        <NoData displayedMessage="Failed Fetching Match Details" />
      </div>
    );

  const { homeTeam, awayTeam, date, venue, league, goals, score } =
    match as MatchDetails;

  return (
    <div className="text-brand-white p-4 md:p-6 rounded-2xl  mt-6 mx-2 md:mx-8">
      <SubHeader
        title="Match Details"
        navigateBack={true}
        onRefresh={fetchData}
        displayAnimation={false}
      />
      <div className="mt-8 space-y-6">
        <DetailsMainInfo
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          date={date}
          venue={venue}
          league={league}
          score={score}
          goals={goals}
        />
        <QuickInfo
          apiService={apiService}
          homeTeam={homeTeam.name}
          homeTeamId={homeTeam.id}
          awayTeam={awayTeam.name}
          awayTeamId={awayTeam.id}
          leagueId={league.id}
          fixtureDate={date}
        />
        <SummariesAndFeeling
          apiService={apiService}
          homeTeam={homeTeam.name}
          homeTeamId={homeTeam.id}
          awayTeam={awayTeam.name}
          awayTeamId={awayTeam.id}
          leagueId={league.id}
          matchId={Number(id)}
        />
        <SeasonStats
          title="Both teams Season Stats"
          homeTeamId={homeTeam.id}
          awayTeamId={awayTeam.id}
          leagueId={league.id}
          homeTeamName={homeTeam.name}
          awayTeamName={awayTeam.name}
          apiService={apiService}
        />
        <H2hStats
          title="H2H Stats"
          homeTeamId={homeTeam.id}
          awayTeamId={awayTeam.id}
          homeTeamName={homeTeam.name}
          awayTeamName={awayTeam.name}
          apiService={apiService}
        />
        <HeadToHead
          homeTeamId={homeTeam.id}
          awayTeamId={awayTeam.id}
          apiService={apiService}
        />
        <MatchOdds fixtureId={Number(id)} apiService={apiService} />
      </div>
    </div>
  );
}
