
import React, { useState, useMemo } from 'react';
import { Game, Category } from './types';
import { GAMES_DATA } from './constants';
import Navbar from './components/Navbar';
import CategoryFilter from './components/CategoryFilter';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';
import ParticleBackground from './components/ParticleBackground';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>(Category.ALL);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === Category.ALL || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const hotGames = useMemo(() => {
    return GAMES_DATA.filter(g => g.isHot);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Particles */}
      <ParticleBackground />

      {/* Main Content wrapper with relative z-index to stay above particles */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 space-y-8">
          {/* Banner Section - Only show when not searching/filtering */}
          {!searchQuery && activeCategory === Category.ALL && (
            <section className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl border border-white/5">
              <img 
                src="https://picsum.photos/seed/banner/1200/400" 
                className="w-full h-full object-cover" 
                alt="Hero Banner"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent flex items-center p-8 md:p-12">
                <div className="max-w-md space-y-4">
                  <span className="bg-rose-600 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">Featured</span>
                  <h2 className="text-3xl md:text-5xl font-orbitron font-bold leading-tight">Vortex Racer</h2>
                  <p className="text-slate-300 text-sm md:text-base">Experience the next generation of high-speed arcade racing. Unlock new ships and master every track.</p>
                  <button 
                    onClick={() => setSelectedGame(GAMES_DATA[0])}
                    className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-rose-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl"
                  >
                    Play Now
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Categories Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <i className="fas fa-th-large text-rose-500"></i> Browse Categories
              </h3>
            </div>
            <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          </section>

          {/* Game Grid Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <i className="fas fa-bolt text-amber-500"></i> 
                {searchQuery ? `Search Results for "${searchQuery}"` : activeCategory === Category.ALL ? 'Most Popular' : `${activeCategory} Games`}
              </h3>
              <span className="text-sm text-slate-500">{filteredGames.length} games found</span>
            </div>

            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game) => (
                  <GameCard 
                    key={game.id} 
                    game={game} 
                    onPlay={setSelectedGame} 
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-black/40 rounded-2xl border border-dashed border-slate-700 backdrop-blur-sm">
                <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-search text-2xl text-slate-600"></i>
                </div>
                <h4 className="text-lg font-semibold text-slate-300">No games found</h4>
                <p className="text-slate-500 text-sm">Try adjusting your search or category filters.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory(Category.ALL); }}
                  className="mt-4 text-rose-400 hover:text-rose-300 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </section>

          {/* Trending Section - Show only on Home */}
          {!searchQuery && activeCategory === Category.ALL && (
             <section className="bg-black/40 rounded-2xl p-6 border border-slate-800 backdrop-blur-sm">
               <div className="flex items-center justify-between mb-6">
                 <h3 className="text-xl font-bold flex items-center gap-2">
                   <i className="fas fa-fire text-rose-500"></i> Trending Now
                 </h3>
                 <a href="#" className="text-xs font-bold text-rose-400 hover:underline uppercase tracking-widest">View All</a>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                 {hotGames.map((game) => (
                   <div 
                     key={game.id} 
                     onClick={() => setSelectedGame(game)}
                     className="group cursor-pointer text-center"
                   >
                     <div className="aspect-square rounded-2xl overflow-hidden mb-2 border border-slate-700 hover:border-rose-500 transition-all">
                       <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                     </div>
                     <span className="text-[10px] font-bold text-slate-400 group-hover:text-white line-clamp-1">{game.title}</span>
                   </div>
                 ))}
               </div>
             </section>
          )}
        </main>

        <footer className="glass-panel border-t border-slate-800 py-12 px-8 mt-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2 space-y-4">
               <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-rose-600 rounded flex items-center justify-center">
                  <i className="fas fa-gamepad text-white text-sm"></i>
                </div>
                <h1 className="text-xl font-orbitron font-bold">NT</h1>
              </div>
              <p className="text-slate-400 text-sm max-w-sm">
                NT Games provides the best curated selection of unblocked web games. Play 2048, Hextris, and hundreds of other titles without restrictions. High performance, zero lag, all fun.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center hover:bg-rose-600 transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center hover:bg-rose-600 transition-colors">
                  <i className="fab fa-discord"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center hover:bg-rose-600 transition-colors">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-200">Navigation</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">New Games</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Popular</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Categories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-200">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">DMCA</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            © 2024 NT Games Unblocked. All Rights Reserved. Built with performance in mind.
          </div>
        </footer>
      </div>

      {/* Fullscreen Player Modal */}
      {selectedGame && (
        <GamePlayer 
          game={selectedGame} 
          onClose={() => setSelectedGame(null)} 
        />
      )}
    </div>
  );
};

export default App;
