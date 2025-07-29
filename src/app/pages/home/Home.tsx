import TodayMatches from "../../components/today-matches/TodayMatches";
import { TodayMatch } from "../../types/types";

interface HomeProps {
  fetchTodayMatches: (status: string) => Promise<TodayMatch[]>;
}

const HomePage = ({ fetchTodayMatches }: HomeProps) => {
  return (
    <div>
      <TodayMatches fetchTodayMatches={fetchTodayMatches} />
    </div>
  );
};

export default HomePage;
