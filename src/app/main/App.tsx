import { Routes, Route } from "react-router-dom";
import Navbar from "./navigation/Navbar";
import Footer from "./footer/Footer";
import HomePage from "../pages/home/Home";

import { apiService as apiServiceImp } from "../services/apiServiceImplementation";
import { apiService as apiMock } from "../../../testSetup/apiMock";
import { useApiMock } from "../services/apiConfig";

import LeagueStanding from "../pages/league-standing/LeagueStanding";
import MatchDetail from "../pages/match-details/MatchDetail";
import About from "../pages/about/About";
import TeamDetailsPage from "../pages/team-details/TeamDetailsPage";

function App() {
  const apiService = Number(useApiMock) === 1 ? apiMock : apiServiceImp;

  return (
    <div className="relative min-h-screen flex flex-col text-white">
      <div className="flex flex-col min-h-screen relative z-10">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage apiService={apiService} />} />
            <Route path="/about" element={<About />} />

            <Route
              path="/league/:leagueId"
              element={<LeagueStanding apiService={apiService} />}
            />

            <Route
              path="/match/:id"
              element={<MatchDetail apiService={apiService} />}
            />
            <Route
              path="/team/:id"
              element={<TeamDetailsPage apiService={apiService} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
