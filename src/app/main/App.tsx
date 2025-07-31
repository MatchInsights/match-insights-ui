import { Routes, Route } from "react-router-dom";
import Navbar from "./navigation/Navbar";
import Footer from "./footer/Footer";
import HomePage from "../pages/home/Home";
import { fetchTodayMatches } from "../services/apiService";

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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
