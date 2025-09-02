import { useState, useEffect } from "react";
import logo from "../../logo/logo.jpg";
import { Link } from "react-router-dom";
import desIcon from "../../images/ball.png";
import intIcon from "../../images/int.png";
import argIcon from "../../images/arg.png";
import ingIcon from "../../images/ing.png";
import espIcon from "../../images/esp.png";
import itaIcon from "../../images/ita.png";
import deuIcon from "../../images/deu.png";
import fraIcon from "../../images/fra.png";
import porIcon from "../../images/por.png";
import braIcon from "../../images/bra.png";
import uruIcon from "../../images/uru.png";
import parIcon from "../../images/par.png";
import colIcon from "../../images/col.png";
import chiIcon from "../../images/chi.png";
import mexIcon from "../../images/mex.png";
import usaIcon from "../../images/usa.png";

const ligas = [
  { name: "DESTACADO", subLigas: ["Liga Profesional","Primera Nacional","Libertadores","Sudamericana","Copa Argentina","Champions League","Mundial","Eliminatorias Conmebol"] },
  { name: "INTERNACIONAL", subLigas: ["Copa Libertadores","Copa Sudamericana","Champions League","Copa Intercontinental","Europa League","Conference League","Mundial de Clubes","Concacaf Champions"] },
  { name: "ARGENTINA", subLigas: ["Liga Profesional","Primera Nacional","Copa Argentina","Copa de la Liga","Primera B Metro","Federal A","Primera C","Promocional Amateur","Liga Profesional - Reserva","Liga Femenina","Copa de la Liga - Reserva","Tabla Historica"] },
  { name: "INGLATERRA", subLigas: ["Premier League","Carabao Cup","FA Cup"] },
  { name: "ESPAÑA", subLigas: ["La Liga","Copa del Rey","Supercopa"] },
  { name: "ITALIA", subLigas: ["Serie A","Coppa Italia","Supercopa"] },
  { name: "ALEMANIA", subLigas: ["Bundesliga","DFB Pokal"] },
  { name: "FRANCIA", subLigas: ["Ligue 1","Copa Francia"] },
  { name: "PORTUGAL", subLigas: ["Primeira Liga"] },
  { name: "BRASIL", subLigas: ["Brasileirao","Copa do Brasil"] },
  { name: "URUGUAY", subLigas: ["Primera Division"] },
  { name: "PARAGUAY", subLigas: ["Copa de Primera"] },
  { name: "COLOMBIA", subLigas: ["Liga BetPlay"] },
  { name: "CHILE", subLigas: ["Primera Division"] },
  { name: "MEXICO", subLigas: ["Liga MX"] },
  { name: "EEUU", subLigas: ["MLS"] },
  { name: "SELECCIONES", subLigas: ["Copa America","Eliminatorias Conmebol","Eliminatorias UEFA","Eurocopa","UEFA Nations League","Eliminatorias Eurocopa","Mundial","Sudamericano Sub20","Eliminatorias Concacaf"] },
];

const ligaIcons: Record<string, string> = {
  DESTACADO: desIcon,
  INTERNACIONAL: intIcon,
  ARGENTINA: argIcon,
  INGLATERRA: ingIcon,
  ESPAÑA: espIcon,
  ITALIA: itaIcon,
  ALEMANIA: deuIcon,
  FRANCIA: fraIcon,
  PORTUGAL: porIcon,
  BRASIL: braIcon,
  URUGUAY: uruIcon,
  PARAGUAY: parIcon,
  COLOMBIA: colIcon,
  CHILE: chiIcon,
  MEXICO: mexIcon,
  EEUU: usaIcon,
  SELECCIONES: intIcon,
};

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openLiga, setOpenLiga] = useState<string | null>(null);

  const toggleLiga = (liga: string) => {
    setOpenLiga(openLiga === liga ? null : liga);
  };

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="bg-brand-royalblue text-white px-6 py-2 shadow-xl flex justify-between items-center">
        <button
          className="text-white text-2xl hover:text-brand-bluelight transition-colors duration-300"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        <div className="flex items-center">
          <Link to="/" className="flex items-center rounded-full">
            <img
              src={logo}
              alt="MatchInsight"
              className="h-10 w-10 md:h-12 md:w-12 rounded-md hover:opacity-90 transition-opacity"
            />
          </Link>
        </div>

        <div className="space-x-4 text-m font-medium">
          <Link to="/" className="hover:text-brand-bluelight font-bold transition-colors">HOME</Link>
          <Link to="/about" className="hover:text-brand-bluelight font-bold transition-colors">ABOUT</Link>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-60 h-full bg-brand-blueintense shadow-lg transform transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-white/20">
          <h2 className="text-m font-bold text-white">LIGAS</h2>
          <button className="text-sm text-white" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        {/* Scrollable sidebar */}
        <div className="flex flex-col px-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
          {ligas.map((liga) => {
            const icon = ligaIcons[liga.name];
            const hasSub = liga.subLigas && liga.subLigas.length > 0;

            return (
              <div key={liga.name}>
                <button
                  onClick={() => hasSub ? toggleLiga(liga.name) : setSidebarOpen(false)}
                  className="w-full text-left bg-white/5 hover:bg-white/20 rounded px-2 py-1 text-white text-sm flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    {icon && <img src={icon} alt={liga.name} className="w-4 h-4" />}
                    <span>{liga.name}</span>
                  </div>
                  {hasSub && <span className="text-xs">{openLiga === liga.name ? "▲" : "▼"}</span>}
                </button>

                {hasSub && openLiga === liga.name && (
                  <div className="ml-6 mt-1 flex flex-col space-y-1">
                    {liga.subLigas!.map((sub) => (
                      <Link
                        key={sub}
                        to={`/liga/${liga.name.toLowerCase()}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                        className="bg-white/5 hover:bg-white/20 rounded px-2 py-1 text-white text-xs"
                        onClick={() => setSidebarOpen(false)}
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
