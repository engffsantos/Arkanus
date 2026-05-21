import React, { useState } from 'react';
import { useGameState } from '../../context/GameContext';
import { Hammer, Coins, Plus, AlertCircle } from 'lucide-react';

export const GuildsScreen: React.FC = () => {
   const { state, dispatch } = useGameState();
   const [showGuildModal, setShowGuildModal] = useState(false);
   const [newGuildType, setNewGuildType] = useState('Ferreiros');

   const activeGuilds: any[] = state.guilds?.guilds || (Array.isArray(state.guilds) ? state.guilds : []);

   const guildTypes = [
     'Escribas', 'Encadernadores', 'Iluminadores', 'Ferreiros', 'Carpinteiros', 
     'Pedreiros', 'Mercadores', 'Apotecários', 'Tecelões', 'Armeiros'
   ];

   const estimatedProduction = activeGuilds.reduce((acc, g) => acc + (g.level * 10), 0);

   const handleEstablishGuild = () => {
      dispatch({
         type: 'DO_ACTION',
         payload: {
            type: 'ESTABLISH_GUILD',
            payload: {
               id: Date.now().toString(),
               type: newGuildType,
               level: 1,
               quality: 'Padrão'
            }
         }
      });
      setShowGuildModal(false);
   };

   return (
      <div className="h-full flex flex-col gap-6">
         <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pb-4 border-b border-arkanus-border">
            <h2 className="font-display text-3xl text-arkanus-gold-light tracking-wide flex items-center gap-3">
               <Hammer className="w-8 h-8 text-amber-500" /> Guildas e Artesãos
            </h2>
            <div className="text-right shrink-0">
               <div className="text-sm uppercase tracking-widest text-arkanus-text-dim">Produção Estimada</div>
               <div className="font-display text-3xl text-green-400 flex items-center justify-end gap-2">
                  <Coins className="w-6 h-6" /> +{estimatedProduction} Prata/Estação
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full min-h-0">
            <div className="col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-max overflow-y-auto custom-scrollbar pr-2">
               {activeGuilds.map((g: any) => (
                  <div key={g.id} className="bg-[#0a0806] border border-arkanus-border rounded p-5 shadow-inner">
                     <div className="flex items-start justify-between mb-2">
                        <h3 className="font-display text-xl text-stone-200">{g.type}</h3>
                        <span className="text-xs uppercase tracking-widest text-stone-500 px-2 py-1 bg-stone-900 border border-stone-800 rounded">Nv {g.level}</span>
                     </div>
                     <div className="text-sm text-stone-400 mb-4">
                        Qualidade: <span className="text-amber-300">{g.quality}</span>
                     </div>
                  </div>
               ))}
               
               <div
                  onClick={() => setShowGuildModal(true)}
                  className="col-span-1 md:col-span-2 border border-dashed border-stone-800 rounded p-6 flex flex-col items-center justify-center opacity-60 hover:opacity-100 hover:border-amber-500/50 transition-all cursor-pointer"
               >
                  <Hammer className="w-8 h-8 text-stone-500 mb-2" />
                  <span className="uppercase tracking-widest text-xs text-stone-400 font-medium">Fundar Nova Guilda (-100 Prata)</span>
               </div>
            </div>

            <div className="col-span-12 md:col-span-4 bg-arkanus-panel border border-arkanus-border rounded p-6 shadow-inner flex flex-col">
               <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500 mb-4 border-b border-arkanus-border pb-2">Estoque e Manufatura</h3>
               <div className="text-center p-8 mt-4">
                  <span className="text-stone-500 text-sm italic font-serif">
                     {activeGuilds.length > 0 
                       ? "Artesãos trabalham diariamente para produzir mercadorias ou prata no fim da estação." 
                       : "O estoque de bens está vazio. Coordene as guildas para iniciar a produção sazonal de mercadorias."
                     }
                  </span>
               </div>
            </div>
         </div>

         {showGuildModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
               <div className="bg-arkanus-panel border border-arkanus-border shadow-2xl rounded p-6 max-w-sm w-full relative">
                  <h3 className="font-display text-2xl text-amber-300 mb-4 border-b border-arkanus-border pb-4">Patrocinar Guilda</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-arkanus-gold-light mb-1 block">Tipo de Ofício</label>
                      <select 
                         value={newGuildType}
                         onChange={e => setNewGuildType(e.target.value)}
                         className="w-full bg-[#0a0806] border border-arkanus-border rounded px-3 py-2 text-arkanus-text focus:outline-none focus:border-amber-500/50 appearance-none"
                      >
                         {guildTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4">
                     <button 
                       onClick={handleEstablishGuild}
                       disabled={state.resources.prata < 100}
                       className="flex-1 py-2 rounded bg-stone-900 border border-stone-700 text-stone-300 uppercase tracking-widest text-xs hover:border-amber-500 hover:text-amber-400 transition-colors disabled:opacity-50"
                     >
                       Fundar (-100 Prata)
                     </button>
                     <button 
                       onClick={() => setShowGuildModal(false)}
                       className="flex-1 py-2 rounded bg-stone-800 border border-transparent text-stone-400 uppercase tracking-widest text-xs hover:bg-stone-700 transition-colors"
                     >
                       Cancelar
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};
