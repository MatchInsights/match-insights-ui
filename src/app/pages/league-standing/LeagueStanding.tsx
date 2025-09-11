import { useEffect, useState } from "react";
import { LeagueInfo, LeagueTeamInfo } from "../../types/league-types";
import { useParams } from "react-router-dom";
import NoData from "../../components/no-data/NoData";
import SubHeader from "../../components/sub-header/SubHeader";
import { ApiService } from "../../services/apiService";
import { CategoryPills } from "../../components/CategoryPills/CategoryPills";
import { LeagueTable } from "../../components/league-table/LeagueTable";

interface LeagueStandingProps {
  apiService: ApiService;
}

export default function LeagueStanding({ apiService }: LeagueStandingProps) {
  const [leagueInfo, setLeagueInfo] = useState<LeagueInfo | null>(null);
  const { leagueId } = useParams<{ leagueId: string }>();
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [categories, setCategories] = useState<string[]>([]);

  const [teams, setTeams] = useState<LeagueTeamInfo[]>([]);

  const getCategories = (data: LeagueInfo): string[] => {
    return [
      ...Array.from(new Set(data.group.map((it) => it.label ?? "default"))),
    ];
  };

  const setTeamsByCategory = (category: string) => {
    const selectedGroup = leagueInfo?.group.filter(
      (it) => it.label === category
    );

    setSelectedCategory(category);
    if (selectedGroup && selectedGroup.length > 0) {
      setTeams(selectedGroup[0].teams);
    } else {
      setTeams(leagueInfo?.group[0].teams ?? []);
    }
  };

  const fetchData = () => {
    if (leagueId) {
      apiService
        .fetchLeagueStanding(Number(leagueId))
        .then((data) => {
          const categories = getCategories(data);
          const firstCategory = categories[0];
          const selectedGroup = data.group.find(
            (g) => g.label === firstCategory
          );

          setLeagueInfo(data);
          setCategories(categories);
          setSelectedCategory(firstCategory);
          setTeams(selectedGroup ? selectedGroup.teams : data.group[0].teams);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setLeagueInfo(null);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, [leagueId]);

  if (loading) return <NoData displayedMessage="Fetching League Details." />;

  if (!loading && !leagueInfo)
    return (
      <div>
        <SubHeader
          title="League Standing"
          navigateBack={true}
          onRefresh={fetchData}
          displayAnimation={true}
        />
        <NoData displayedMessage="League Details Not Found." />
      </div>
    );

  return (
    <div className="text-brand-white p-4 md:p-6 rounded-2xl shadow-xl mt-6 mx-2 md:mx-8">
      <SubHeader
        title="League Standing"
        navigateBack={true}
        onRefresh={fetchData}
        displayAnimation={true}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="text-center md:text-left m-2 p-2">
          <h1
            data-testid="h1-category"
            className="text-lg font-bold text-brand-orange"
          >
            {selectedCategory} - {leagueInfo?.season}
          </h1>
        </div>
      </div>
      <div className="sticky top-0 bg-black z-10 p-1">
        <CategoryPills
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setTeamsByCategory}
        />
      </div>
      <LeagueTable teams={teams} />
    </div>
  );
}
