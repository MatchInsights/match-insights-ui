import { Routes, Route } from "react-router-dom";
import Navbar from "./navigation/Navbar";
import Footer from "./footer/Footer";
import HomePage from "../pages/home/Home";
import { fetchLeagueStanding, fetchTodayMatches } from "../services/apiService";
import LeagueStanding from "../components/league-standing/LeagueStanding";

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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
