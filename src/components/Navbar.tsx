import { NAV_LINKS } from "../constants/navigation";

export const Navbar = () => {
  return (
    <nav className="bg-(--orange) h-[50px] px-6 flex items-center relative">
      {/* Logo */}
      <a
        href="https://news.ycombinator.com"
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline mr-2.5 z-10 hover:opacity-80 transition-opacity cursor-pointer"
      >
        <div className="w-6 h-6 border-2 border-white/80 rounded flex items-center justify-center">
          <img src="https://news.ycombinator.com/y18.svg" alt="Y Combinator" />
        </div>
      </a>

      <a
        href="https://news.ycombinator.com/news"
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold mr-6 text-[0.95rem] text-white no-underline z-10 hover:opacity-80 transition-opacity cursor-pointer"
      >
        Hacker News
      </a>

      {/* Nav links */}
      <ul className="flex gap-5 list-none m-0 p-0 z-10">
        {NAV_LINKS.map(({ label, path }) => (
          <li key={label}>
            <a
              href={`https://news.ycombinator.com/${path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/85 text-[0.8rem] font-medium no-underline capitalize hover:text-white transition-colors"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
