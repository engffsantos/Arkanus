import React from 'react';
import { Leaf, Gem, Cross, Hammer } from 'lucide-react';
import { useGameState } from '../context/GameContext';

export const EventLogPanel: React.FC = () => {
  const { state } = useGameState();

  const getIconForType = (type: string) => {
    switch(type) {
      case 'success':
        return <div className="w-4 h-4 bg-green-900 rounded-full border border-green-500 flex items-center justify-center"><Cross className="w-3 h-3 text-green-400" /></div>;
      case 'alert':
        return <div className="w-4 h-4 bg-red-900 rounded-full border border-red-500 flex items-center justify-center"><Cross className="w-3 h-3 text-red-500" /></div>;
      default:
        return <Leaf className="w-4 h-4 text-green-500" />;
    }
  };

  return (
    <div className="bg-arkanus-panel border border-arkanus-border rounded shadow-lg overflow-hidden flex flex-col h-full">
      <div className="py-2 border-b border-arkanus-border text-center relative flex justify-center items-center">
         <div className="absolute left-0 w-1/3 h-px bg-gradient-to-r from-transparent to-arkanus-border"></div>
         <h2 className="font-display text-sm text-arkanus-gold tracking-[0.2em] uppercase px-4 flex items-center gap-2">
            <span className="text-arkanus-gold/30">❖</span>
            Registro da Estação
            <span className="text-arkanus-gold/30">❖</span>
         </h2>
         <div className="absolute right-0 w-1/3 h-px bg-gradient-to-l from-transparent to-arkanus-border"></div>
      </div>
      
      <div className="flex-1 p-2 overflow-y-auto overflow-x-hidden font-sans flex items-stretch">
        <ul className="flex-1 flex flex-col divide-y divide-arkanus-border/50 bg-[#14120f] border border-arkanus-border/50 rounded p-1 shadow-inner min-h-full">
          {state.events.map((ev, i) => (
            <li key={ev.id} className={`flex items-center justify-between px-3 py-1.5 text-sm hover:bg-white/5 transition-colors ${i % 2 === 0 ? 'bg-transparent' : 'bg-black/20'}`}>
              <div className="flex items-center gap-3">
                <div className="w-5 flex justify-center shrink-0">{getIconForType(ev.type)}</div>
                <span className="text-arkanus-text text-[13px]">{ev.text}</span>
              </div>
              <span className="text-arkanus-text-dim text-[11px] shrink-0 font-serif lowercase italic pl-4">{ev.time}</span>
            </li>
          ))}
        </ul>

        {/* Decorative Ink and Quill element on the right */}
        <div className="w-48 shrink-0 flex items-end justify-end p-2 opacity-50 pl-4 pointer-events-none hidden md:flex">
             <div className="relative w-24 h-24 bg-stone-900 border border-stone-700/50 rounded-full flex items-center justify-center -mb-8 mr-2 shadow-[0_-5px_15px_rgba(0,0,0,0.5)]">
                {/* Fake inkwell */}
                <div className="absolute bottom-2 w-16 h-12 bg-black rounded-lg border-t-4 border-stone-800"></div>
                {/* Fake quill stem */}
                <div className="absolute bottom-6 -right-4 w-1 h-32 bg-amber-100/20 rounded-full transform rotate-[30deg]"></div>
                {/* Fake feather basic structure */}
                <svg viewBox="0 0 100 200" className="absolute bottom-12 -right-8 w-20 h-40 transform rotate-[30deg] opacity-70 fill-current text-stone-400">
                   <path d="M50 200 C50 150 20 100 40 20 C60 100 80 150 50 200 Z" />
                   <path d="M50 200 C50 150 40 100 45 20 C55 100 60 150 50 200 Z" className="fill-stone-600" />
                </svg>
             </div>
        </div>
      </div>
    </div>
  );
};
