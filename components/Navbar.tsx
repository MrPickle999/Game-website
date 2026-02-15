
import React from 'react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/5 px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-rose-600 rounded-lg flex items-center justify-center shadow-lg shadow-rose-500/20">
            <i className="fas fa-gamepad text-white text-xl"></i>
          </div>
          <h1 className="text-2xl font-orbitron font-bold tracking-tighter bg-gradient-to-r from-white via-rose-200 to-rose-400 bg-clip-text text-transparent">
            NT GAMES
          </h1>
        </div>

        <div className="relative w-full md:w-96">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input
            type="text"
            placeholder="Search for a game..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/50 border border-slate-700 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all placeholder:text-slate-500"
          />
        </div>

        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Discord</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <button className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2 rounded-full transition-all flex items-center gap-2">
            <i className="fas fa-star text-xs"></i>
            Favorites
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
