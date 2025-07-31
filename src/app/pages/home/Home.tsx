import TodayMatches from "../../components/today-matches/TodayMatches";
import { TodayMatch } from "../../types/types";

interface HomeProps {
  fetchTodayMatches: (status: string) => Promise<TodayMatch[]>;
}

const Home = ({ fetchTodayMatches }: HomeProps) => {
  return (
    <div data-testid="today-matches">
      <TodayMatches fetchTodayMatches={fetchTodayMatches} />
    </div>
  );
};

export default Home;
