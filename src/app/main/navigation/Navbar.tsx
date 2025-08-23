import logo from "../../logo/logo.jpg";

const Navbar = () => {
  return (
    <nav className="bg-brand-orange text-black px-6 py-4 shadow-xl flex justify-between items-center">
      <div className="flex items-center ">
        <a
          data-testid="brand"
          href="/"
          className="flex items-center rounded-full"
        >
          <img
            src={logo}
            alt="MatchInsight"
            className="h-10 w-10 md:h-12 md:w-12 rounded-md hover:opacity-90 transition-opacity"
          />
        </a>
      </div>

      <div className="space-x-4 text-sm font-medium">
        <a href="/" className="hover:text-white transition-colors">
          Home
        </a>
        <a href="/about" className="hover:text-white transition-colors">
          About
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
