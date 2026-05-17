import React from 'react';
import { Book, User, Sparkles, CodeSquare, Hexagon, MessageSquare } from 'lucide-react';

export const MagePanel: React.FC = () => {
  return (
    <div className="bg-arkanus-panel border border-arkanus-border flex flex-col rounded shadow-lg overflow-hidden h-full">
      <div className="py-2 border-b border-arkanus-border text-center bg-gradient-to-b from-arkanus-panel-light to-transparent">
        <h2 className="font-display text-lg text-arkanus-gold tracking-[0.2em] uppercase">Mago</h2>
      </div>
      
      <div className="p-3 flex flex-col h-full">
        <div className="flex gap-4">
           {/* Mage Portrait */}
           <div className="w-[120px] h-[160px] shrink-0 border-2 border-arkanus-border bg-[#0a0806] rounded-[2px] overflow-hidden relative shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
               <img 
                 src="https://images.unsplash.com/photo-1588780530902-bfc1eb757db6?auto=format&fit=crop&w=300&q=80" 
                 alt="Mage Portrait" 
                 className="w-full h-full object-cover object-top filter grayscale-[0.5] sepia-[0.4] brightness-75 contrast-[1.2]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806] via-transparent to-transparent opacity-80"></div>
               <div className="absolute inset-0 ring-1 ring-inset ring-amber-900/30"></div>
           </div>

           {/* Stats */}
           <div className="flex-1 flex flex-col gap-[3px] text-sm">
             <MageStat icon={<Book className="w-3 h-3 text-amber-500/80" />} label="Inteligência" value="16" />
             <MageStat icon={<MessageSquare className="w-3 h-3 text-amber-500/80" />} label="Comunicação" value="12" />
             <div className="my-1 border-t border-arkanus-border"></div>
             <MageStat icon={<Sparkles className="w-3 h-3 text-blue-400/80" />} label="Teoria Arcana" value="15" />
             <MageStat icon={<Hexagon className="w-3 h-3 text-blue-400/80" />} label="Técnica" value="13" />
             <MageStat icon={<CodeSquare className="w-3 h-3 text-blue-400/80" />} label="Forma" value="11" />
             <div className="my-1 border-t border-arkanus-border"></div>
             <MageStat icon={<User className="w-3 h-3 text-stone-400" />} label="Idioma (Latim)" value="14" />
           </div>
        </div>

        <div className="mt-auto pt-3 text-center border-t border-arkanus-border flex items-center justify-center gap-2">
           <Hexagon className="w-3 h-3 text-amber-600 outline outline-1 outline-offset-2 outline-amber-700 rounded-full" />
           <p className="text-xs text-arkanus-text-dim font-serif italic tracking-wide">Ordo Hermeticus — Filhos de Mercúrio</p>
           <Hexagon className="w-3 h-3 text-amber-600 outline outline-1 outline-offset-2 outline-amber-700 rounded-full flex-none transform rotate-180" />
        </div>
      </div>
    </div>
  );
};

const MageStat = ({ icon, label, value }: any) => (
  <div className="flex items-center justify-between group">
    <div className="flex items-center gap-2">
      <div className="w-5 flex justify-center text-arkanus-text-dim group-hover:text-amber-500 transition-colors">{icon}</div>
      <span className="text-[11px] font-sans text-arkanus-text uppercase tracking-wider">{label}</span>
    </div>
    <span className="font-serif text-arkanus-gold-light font-medium">{value}</span>
  </div>
);
