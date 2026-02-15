
import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onPlay: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onPlay }) => {
  return (
    <div 
      className="group relative bg-slate-800/40 rounded-xl overflow-hidden border border-slate-700/50 game-card-hover cursor-pointer transition-all duration-300"
      onClick={() => onPlay(game)}
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
        
        {game.isHot && (
          <div className="absolute top-2 left-2 bg-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg">
            <i className="fas fa-fire"></i> Hot
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
          <div className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center shadow-xl transform scale-0 group-hover:scale-100 transition-transform">
            <i className="fas fa-play text-white ml-1"></i>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors">
            {game.title}
          </h3>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            {game.category}
          </span>
        </div>
        <p className="text-xs text-slate-400 line-clamp-2">
          {game.description}
        </p>
      </div>
    </div>
  );
};

export default GameCard;
