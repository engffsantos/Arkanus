import React from 'react';
import { Coins, Scale, Droplets, ShieldCheck, Castle, Home, Compass } from 'lucide-react';
import { useGameState } from '../context/GameContext';

export const SovereigntyPanel: React.FC = () => {
  return (
    <div className="bg-arkanus-panel border border-arkanus-border flex flex-col h-full rounded shadow-lg overflow-hidden relative group">
      <div className="py-2 border-b border-arkanus-border text-center bg-gradient-to-b from-arkanus-panel-light to-transparent">
        <h2 className="font-display text-lg text-arkanus-gold tracking-[0.2em] uppercase">Soberania</h2>
      </div>
      
      <div className="flex-1 p-3 flex flex-col gap-4">
        {/* Map Image container */}
        <div className="relative w-full flex-1 min-h-[240px] rounded border border-arkanus-border-highlight overflow-hidden bg-stone-900 group">
            
            {/* The actual image */}
            <img 
               src="https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?auto=format&fit=crop&w=800&q=80" 
               alt="Domain Map" 
               className="absolute inset-0 w-full h-full object-cover sepia-[0.4] contrast-[1.1] brightness-[0.7] group-hover:scale-105 transition-transform duration-[10s] ease-out" 
            />
            {/* Vignette overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, transparent 20%, #0a0806 100%)' }}></div>

            {/* Subtle Pins/Markers */}
            <div className="absolute top-4 left-4 flex flex-col items-center transition-transform hover:-translate-y-1 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
              <Castle className="w-10 h-10 text-stone-200 fill-stone-800" />
              <div className="mt-1 bg-red-900/90 border border-red-700/50 rounded flex px-1.5 py-0.5"><ShieldCheck className="w-3 h-3 text-red-200"/></div>
            </div>
            
            <div className="absolute top-16 right-8 flex flex-col items-center transition-transform hover:-translate-y-1 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
              <div className="flex gap-1">
                <Home className="w-5 h-5 text-amber-200 fill-amber-900" />
                <Home className="w-4 h-4 text-amber-200 fill-amber-900 mt-2" />
                <Home className="w-5 h-5 text-amber-200 fill-amber-900" />
              </div>
              <div className="mt-1 bg-amber-900/90 rounded border border-amber-700/50 px-1.5 py-0.5"><Home className="w-3 h-3 text-amber-200"/></div>
            </div>

            {/* Glowing magic stone node */}
            <div className="absolute bottom-12 right-12 flex flex-col items-center transition-transform hover:-translate-y-1">
               <div className="w-14 h-14 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="w-10 h-10 rounded-full border border-blue-400/50 bg-blue-900/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.6)] backdrop-blur-sm relative z-10">
                     <div className="w-1.5 h-6 bg-blue-100 shadow-[0_0_15px_rgba(59,130,246,1)] rounded-sm"></div>
                  </div>
               </div>
               <div className="mt-1 bg-[#1e2a4a]/90 rounded-full p-1.5 border border-blue-500/50 shadow-md relative z-10"><Compass className="w-3 h-3 text-blue-200"/></div>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 h-28">
            <StatBox icon={<Coins className="w-5 h-5 text-yellow-500/80" />} title="Renda" value="+320 /est." sub="2.450" valueColor="text-arkanus-green" />
            <StatBox icon={<Scale className="w-5 h-5 text-amber-600/80" />} title="Despesas" value="-180 /est." sub="1.380" valueColor="text-arkanus-red" />
            <StatBox icon={<Droplets className="w-5 h-5 text-green-500/80" />} title="Saúde Pública" value="72%" sub="Boa" valueColor="text-arkanus-gold-light" />
            <StatBox icon={<ShieldCheck className="w-5 h-5 text-stone-300/80" />} title="Segurança" value="85%" sub="Estável" valueColor="text-arkanus-gold-light" />
        </div>
        
        <div className="mt-auto text-center border-t border-arkanus-border pt-2 pb-1">
           <p className="text-xs text-arkanus-text-dim font-serif italic">Ordo, Sapientia, Caritas</p>
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ icon, title, value, sub, valueColor }: any) => (
  <div className="bg-arkanus-bg border border-arkanus-border rounded p-2 flex items-center gap-3 shadow-inner hover:border-arkanus-border-highlight transition-colors cursor-default">
    <div className="bg-gradient-to-b from-stone-800 to-stone-900 border border-stone-700/50 p-2 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-[11px] text-arkanus-text-dim uppercase tracking-wider leading-none mb-1">{title}</span>
      <span className={`text-base font-serif leading-none ${valueColor}`}>{value}</span>
      <span className="text-[10px] text-arkanus-text mt-0.5 opacity-60 leading-none">{sub}</span>
    </div>
  </div>
);
