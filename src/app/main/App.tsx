import { Routes, Route } from "react-router-dom";
import Navbar from "./navigation/Navbar";
import Footer from "./footer/Footer";
import HomePage from "../pages/home/Home";

//import { apiService } from "../services/apiService";
import { apiService } from "../../../testSetup/apiMock";

import LeagueStanding from "../pages/league-standing/LeagueStanding";
import MatchDetail from "../pages/match-details/MatchDetail";
import About from "../pages/about/About";

function App() {
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
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
