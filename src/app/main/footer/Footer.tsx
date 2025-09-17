import { FaXTwitter, FaDiscord, FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-brand-blueintense text-white text-sm py-6 mt-12">
      <div className="bg-brand-blueintense text-white px-6 py-2 flex justify-between items-center gap-4">
        {/* Copyright */}
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} MatchInsights.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          <a
            data-testid="x-link"
            href="https://x.com/FootMInsights"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-bluelight transition-colors"
            aria-label="Follow us on X"
          >
            <FaXTwitter size={20} />
          </a>
          <a
            data-testid="discord-link"
            href="https://discord.gg/7nJ8E75YjD"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-bluelight transition-colors"
            aria-label="Join our Discord"
          >
            <FaDiscord size={22} />
          </a>
          <a
            data-testid="git-link"
            href="https://github.com/MatchInsights"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-bluelight transition-colors"
            aria-label="View our GitHub"
          >
            <FaGithub size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
