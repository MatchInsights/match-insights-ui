import logo from "../../logo/logo.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-brand-orange text-black px-6 py-4 shadow-xl flex justify-between items-center">
      <div data-testid="brand-link" className="flex items-center ">
        <Link to="/" className="flex items-center rounded-full">
          <img
            src={logo}
            alt="MatchInsight"
            className="h-10 w-10 md:h-12 md:w-12 rounded-md hover:opacity-90 transition-opacity"
          />
        </Link>
      </div>

      <div
        data-testid="home-about-links"
        className="space-x-4 text-sm font-medium"
      >
        <Link to="/" className="hover:text-white text-lg transition-colors">
          Home
        </Link>
        <Link
          to="/about"
          className="hover:text-white text-lg transition-colors"
        >
          About
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
