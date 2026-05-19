import React, { useState } from 'react';
import { Beaker, BookOpen, PenTool, ScrollText, Handshake, Landmark, Swords, Sun } from 'lucide-react';
import { useGameState } from '../context/GameContext';

const actionDefinitions: Record<string, any> = {
  lab: {
    title: "Trabalhar no Laboratório",
    description: "Use teoria arcana, técnica, forma e essência para avançar projetos arcanos.",
    forecast: "A pesquisa arcana avançará nesta estação.",
    icon: <Beaker className="w-12 h-12 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]" />,
    image: "https://images.unsplash.com/photo-1626027376037-b3e144a4ab5a?auto=format&fit=crop&w=400&q=80"
  },
  estudo: {
    title: "Estudar Texto Arcano",
    description: "Dedique a estação à leitura de um Tomo Maior ou Tratado Menor na biblioteca.",
    forecast: "O conhecimento mágico do mago será ampliado.",
    icon: <BookOpen className="w-12 h-12 text-stone-300 drop-shadow-[0_0_8px_rgba(168,162,158,0.6)]" />,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80"
  },
  escrita: {
    title: "Escrever Conhecimento",
    description: "Registre os segredos descobertos no laboratório em um novo grimório.",
    forecast: "Um novo volume será adicionado à biblioteca de Arkanus.",
    icon: <PenTool className="w-12 h-12 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />,
    image: "https://images.unsplash.com/photo-1580130281320-0ef0754f2bf7?auto=format&fit=crop&w=400&q=80"
  },
  gov: {
    title: "Administrar Feudo",
    description: "Organize os recursos, supervise os servos, melhore as condições do feudo e fortaleça a base produtiva.",
    forecast: "A lealdade aumentou, a condição sanitária melhorou e a base produtiva foi estabilizada.",
    icon: <ScrollText className="w-12 h-12 text-amber-200 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />,
    image: "https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?auto=format&fit=crop&w=400&q=80"
  },
  dip: {
    title: "Negociação Diplomática",
    description: "Envie emissários para discutir alianças ou acalmar a inquisição e os nobres locais.",
    forecast: "As tensões locais diminuirão temporariamente.",
    icon: <Handshake className="w-12 h-12 text-yellow-600 drop-shadow-[0_0_8px_rgba(202,138,4,0.6)]" />,
    image: "https://images.unsplash.com/photo-1582215894165-2b4742ab6726?auto=format&fit=crop&w=400&q=80"
  },
  com: {
    title: "Comércio Local",
    description: "Estimule negociantes e guildas de artesãos. Troque excedentes por prata.",
    forecast: "A feira local receberá um influxo de prata.",
    icon: <Landmark className="w-12 h-12 text-stone-400 drop-shadow-[0_0_8px_rgba(156,163,175,0.6)]" />,
    image: "https://images.unsplash.com/photo-1621252178225-b461fbf29eb5?auto=format&fit=crop&w=400&q=80"
  },
  con: {
    title: "Conflito Regulado",
    description: "Reuna os guardas ou convoque um duelo formal sob as antigas leis arcanas.",
    forecast: "Um rival será desafiado.",
    icon: <Swords className="w-12 h-12 text-red-600 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]" />,
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=400&q=80"
  }
};

export const ActionsPanel: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState('gov');
  const { state, dispatch } = useGameState();

  const handleAdvance = () => {
    dispatch({
      type: 'ADVANCE_TURN',
      payload: {
        actionDetails: actionDefinitions[selectedAction],
        selectedActionId: selectedAction
      }
    });
  };

  const getNextSeason = () => {
    const seasons = ['Primavera', 'Verão', 'Outono', 'Inverno'];
    const idx = seasons.indexOf(state.season);
    return seasons[(idx + 1) % 4];
  };

  const currentDef = actionDefinitions[selectedAction];

  const actions = [
    { id: 'lab', name: 'Laboratório', icon: <Beaker className="w-8 h-8 opacity-70" /> },
    { id: 'estudo', name: 'Estudo', icon: <BookOpen className="w-8 h-8 opacity-70" /> },
    { id: 'escrita', name: 'Escrita', icon: <PenTool className="w-8 h-8 opacity-70" /> },
    { id: 'gov', name: 'Governança', icon: <ScrollText className={`w-10 h-10 ${selectedAction === 'gov' ? 'text-amber-200 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'opacity-70'}`} /> },
    { id: 'dip', name: 'Diplomacia', icon: <Handshake className="w-8 h-8 opacity-70" /> },
    { id: 'com', name: 'Comércio', icon: <Landmark className="w-8 h-8 opacity-70" /> },
    { id: 'con', name: 'Conflito', icon: <Swords className="w-8 h-8 opacity-70" /> },
  ];

  return (
    <div className="bg-arkanus-panel/90 backdrop-blur-sm border-2 border-[#b08c5c]/40 flex flex-col h-full rounded-[2px] shadow-2xl overflow-hidden relative"
         style={{ backgroundImage: 'radial-gradient(ellipse at center, rgba(30,24,18,0.8) 0%, rgba(15,12,9,1) 100%)' }}>
      
      {/* Decorative corners */}
      <div className="absolute top-2 left-3 text-[#b08c5c]/40 font-serif text-xl">✤</div>
      <div className="absolute top-2 right-3 text-[#b08c5c]/40 font-serif text-xl">✤</div>

      <div className="py-4 border-b border-[#b08c5c]/20 relative z-10 flex justify-center items-center">
         <div className="h-px bg-gradient-to-r from-transparent via-[#b08c5c]/50 to-transparent absolute bottom-0 left-10 right-10"></div>
         <h2 className="font-display text-xl text-[#d4b98c] tracking-[0.2em] uppercase flex items-center justify-center gap-4 drop-shadow-md">
           <span className="text-[#b08c5c]/60 text-sm">✧</span>
           Ações da Estação
           <span className="text-[#b08c5c]/60 text-sm">✧</span>
         </h2>
      </div>

      <div className="flex-1 px-6 pb-6 pt-4 flex flex-col">
        {/* Action Selection Row */}
        <div className="flex flex-wrap justify-between items-end gap-2 mb-6">
          {actions.map(act => (
            <button 
              key={act.id}
              onClick={() => setSelectedAction(act.id)}
              className={`flex flex-col items-center gap-2 group flex-1
                ${selectedAction === act.id ? 'transform -translate-y-2' : 'hover:-translate-y-1 hover:bg-white/5'} 
                transition-all duration-300 ease-out`}
            >
              <div className={`
                w-full aspect-[3/4] flex items-center justify-center rounded-[2px] shadow-inner transition-all border
                ${selectedAction === act.id 
                  ? 'bg-gradient-to-b from-[#3a2e1d] to-[#1e1710] border-[#9baae4] shadow-[0_0_15px_rgba(96,165,250,0.5)] ring-1 ring-[#9baae4]/50' 
                  : 'bg-gradient-to-b from-stone-800 to-stone-900 border-stone-700/50 group-hover:border-stone-500/50'}
              `}>
                {act.id === selectedAction ? currentDef.icon : act.icon}
              </div>
              <span className={`text-[9px] sm:text-[10px] font-display uppercase tracking-widest mt-1 ${selectedAction === act.id ? 'text-[#e5d4b3] drop-shadow-md' : 'text-arkanus-text-dim'}`}>
                {act.name}
              </span>
            </button>
          ))}
        </div>

        {/* Action Detail Card */}
        <div className="bg-[#e4d5be] border-2 border-[#b08c5c]/70 rounded-[2px] p-5 flex flex-col sm:flex-row gap-5 mb-auto shadow-[inset_0_0_60px_rgba(150,110,60,0.15)] relative overflow-hidden">
           {/* Detailed Image */}
           <div className="w-full sm:w-[180px] h-[140px] rounded-[1px] border border-[#5c4a35] bg-[#2a2218] flex items-center justify-center shrink-0 overflow-hidden relative shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
              <img 
                src={currentDef.image} 
                alt={currentDef.title} 
                className="w-full h-full object-cover mix-blend-multiply opacity-90 sepia-[0.3] contrast-125 brightness-90 grayscale-[0.2]"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-[#3a2210]/50 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] mix-blend-overlay"></div>
           </div>

           <div className="flex flex-col w-full relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              <h3 className="font-display text-2xl text-[#3a2210] uppercase tracking-wider mb-2 font-bold">{currentDef.title}</h3>
              <p className="text-[13px] font-serif text-[#4a3219] tracking-wide leading-relaxed mb-4 italic">
                {currentDef.description}
              </p>
              
              <div className="mt-auto flex items-start gap-2 text-xs font-serif text-[#1e4620] bg-white/30 backdrop-blur-sm p-3 rounded-[2px] border border-[#1e4620]/30 shadow-sm leading-snug">
                 <p className="font-bold">{currentDef.forecast}</p>
              </div>

              {/* Faded wax seal graphic on the right */}
              <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none text-[#5c3a21]">
                 <div className="w-24 h-24 rounded-full border-2 border-current flex items-center justify-center -rotate-12">
                    <span className="font-display text-3xl">♔</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Big Action Button */}
        <button 
          onClick={handleAdvance}
          className="w-full relative group mt-6 cursor-pointer rounded-[2px] overflow-hidden"
        >
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#254162] to-transparent group-hover:via-[#355b85] transition duration-500 opacity-60"></div>
           <div className="relative w-full bg-gradient-to-b from-[#111822] to-[#0a0f15] border-y-2 border-[#41628d] hover:border-[#6f9cdc] py-4 shadow-[0_0_20px_rgba(37,65,98,0.5)] transition-colors flex items-center justify-center">
             
             <Sun className="absolute left-6 w-6 h-6 text-[#ce9c56] hover:rotate-90 transition-transform duration-700 drop-shadow-[0_0_5px_currentColor]" />
             
             <div className="flex items-center gap-4 z-10">
               <div className="h-px bg-gradient-to-r from-transparent to-[#41628d] w-12"></div>
               <span className="font-display text-xl text-[#d0e0f0] tracking-[0.15em] uppercase drop-shadow-[0_0_8px_rgba(208,224,240,0.5)]">
                 Avançar para {getNextSeason()}
               </span>
               <div className="h-px bg-gradient-to-l from-transparent to-[#41628d] w-12"></div>
             </div>
           </div>
        </button>
      </div>
    </div>
  );
};

