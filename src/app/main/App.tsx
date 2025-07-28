import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
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
