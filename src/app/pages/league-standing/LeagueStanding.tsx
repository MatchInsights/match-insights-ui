import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LeagueInfo, LeagueTeamInfo } from "../../types/league-types";
import { ApiService } from "../../services/apiService";
import NoData from "../../components/no-data/NoData";
import SubHeader from "../../components/sub-header/SubHeader";
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

  const getCategories = (data: LeagueInfo): string[] =>
    Array.from(new Set(data.group.map((it) => it.label ?? "default")));

  const setTeamsByCategory = (category: string) => {
    const selectedGroup = leagueInfo?.group.find((it) => it.label === category);
    setSelectedCategory(category);
    setTeams(selectedGroup?.teams ?? leagueInfo?.group[0].teams ?? []);
  };

  const fetchData = () => {
    if (!leagueId) return;
    apiService
      .fetchLeagueStanding(Number(leagueId))
      .then((data) => {
        const cats = getCategories(data);
        const firstCategory = cats[0];
        const selectedGroup = data.group.find((g) => g.label === firstCategory);

        setLeagueInfo(data);
        setCategories(cats);
        setSelectedCategory(firstCategory);
        setTeams(selectedGroup?.teams ?? data.group[0].teams);
        setLoading(false);
      })
      .catch(() => {
        setLeagueInfo(null);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [leagueId]);

  if (loading) return <NoData displayedMessage="Fetching League Details." />;

  if (!leagueInfo)
    return (
      <div>
        <SubHeader
          title="League Standing"
          navigateBack
          onRefresh={fetchData}
          displayAnimation
        />
        <NoData displayedMessage="League Details Not Found." />
      </div>
    );

  return (
    <div className="text-brand-white p-4 md:p-6 mt-6 mx-2 md:mx-8 rounded-2xl shadow-xl space-y-6">
      <SubHeader
        title="League Standing"
        navigateBack
        onRefresh={fetchData}
        displayAnimation
      />

      {/* Categoría y temporada */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="m-2 p-2 text-center md:text-left">
          <h1
            data-testid="h1-category"
            className="text-lg font-bold text-brand-orange"
          >
            {selectedCategory} - {leagueInfo?.season}
          </h1>
        </div>
      </div>

      {/* Filtro de categorías */}
      <div className="sticky top-0 z-10 p-1 bg-brand-darkBg">
        <CategoryPills
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setTeamsByCategory}
        />
      </div>

      {/* Tabla de equipos */}
      <LeagueTable teams={teams} />
    </div>
  );
}
