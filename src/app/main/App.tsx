import { Routes, Route } from "react-router-dom";
import Navbar from "./navigation/Navbar";
import Footer from "./footer/Footer";
import HomePage from "../pages/home/Home";
import {
  fetchLeagueStanding,
  fetchMatchDetails,
  fetchTodayMatches,
} from "../services/apiService";
import LeagueStanding from "../components/league-standing/LeagueStanding";
import MatchDetail from "../components/match-details/MatchDetails";

function App() {
  return (
    <div className="bg-brand-darkBg min-h-screen text-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={<HomePage fetchTodayMatches={fetchTodayMatches} />}
          />

          <Route
            path="/league/:leagueId"
            element={<LeagueStanding fetchStandings={fetchLeagueStanding} />}
          />

          <Route
            path="/match/:id"
            element={<MatchDetail fetchMatchDetails={fetchMatchDetails} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
