import TodayMatches from "../../components/today-matches/TodayMatches";
import { ApiService } from "../../services/apiService";

interface HomeProps {
  apiService: ApiService;
}

const Home = ({ apiService }: HomeProps) => {
  return (
    <div data-testid="today-matches">
      <TodayMatches apiService={apiService} />
    </div>
  );
};

export default Home;
