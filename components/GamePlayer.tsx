
import React from 'react';
import { Game } from '../types';

interface GamePlayerProps {
  game: Game;
  onClose: () => void;
}

const GamePlayer: React.FC<GamePlayerProps> = ({ game, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-slate-950">
      {/* Control Bar */}
      <div className="h-14 flex items-center justify-between px-4 glass-panel border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-800 transition-colors"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <div>
            <h2 className="font-semibold text-slate-100 leading-tight">{game.title}</h2>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{game.category}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm transition-colors">
            <i className="fas fa-heart"></i> Favorite
          </button>
          <button className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm transition-colors">
            <i className="fas fa-expand"></i> Fullscreen
          </button>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-rose-600/10 text-rose-500 hover:bg-rose-600 hover:text-white transition-all"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>

      {/* Game Iframe */}
      <div className="flex-1 w-full bg-black relative overflow-hidden">
        <iframe
          src={game.url}
          title={game.title}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-scripts allow-same-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default GamePlayer;
