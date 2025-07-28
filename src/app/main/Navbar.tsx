const Navbar = () => {
  return (
    <nav className="bg-brand-orange text-black px-6 py-4 shadow-md flex justify-between items-center">
      <div className="text-xl font-bold text-white">
        <a href="/" className="hover:text-black">
          Before You Bet
        </a>
      </div>
      <div className="space-x-4 text-sm">
        <a href="/" className="hover:text-white">
          Home
        </a>
        <a href="/leagues" className="hover:text-white">
          Leagues
        </a>
        <a href="/about" className="hover:text-white">
          About
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
