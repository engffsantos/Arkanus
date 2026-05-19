import React from 'react';
import { useGameState } from '../../context/GameContext';
import { Handshake, Component, Landmark, MessageSquare, AlertTriangle } from 'lucide-react';

export const DiplomacyScreen: React.FC = () => {
   const { state, dispatch } = useGameState();

   // Factions list from state
   const factions = (state.diplomacy && Array.isArray(state.diplomacy.factions)) ? state.diplomacy.factions : [];

   return (
      <div className="h-full flex flex-col gap-6">
         <div className="flex justify-between items-center pb-4 border-b border-arkanus-border">
            <h2 className="font-display text-3xl text-arkanus-gold-light tracking-wide flex items-center gap-3">
               <Handshake className="w-8 h-8 text-amber-500" /> Chancelaria e Diplomacia
            </h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full min-h-0">
            <div className="col-span-12 md:col-span-8 overflow-y-auto custom-scrollbar pr-2 grid gap-4">
               {factions.map(f => (
                  <div key={f.id} className="bg-[#0a0806] border border-arkanus-border hover:border-amber-900/50 rounded flex flex-col md:flex-row transition-colors shadow-inner h-fit">
                     <div className="p-6 border-b md:border-b-0 md:border-r border-arkanus-border flex flex-col w-full md:w-64 md:shrink-0">
                        <h3 className="font-display text-xl text-stone-200 mb-2">{f.name}</h3>
                        <div className="text-xs text-stone-400 uppercase tracking-widest mb-1">
                           Influência: <span className="text-amber-400">{f.influence}</span>
                        </div>
                     </div>
                     <div className="p-6 flex-1 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-2">
                           <span className="text-sm uppercase tracking-widest text-stone-500">Relações</span>
                           <div className="flex-1 h-2 bg-stone-900 rounded overflow-hidden">
                              <div 
                                 className={`h-full ${f.relations > 60 ? 'bg-green-500' : f.relations < 40 ? 'bg-red-500' : 'bg-amber-500'}`} 
                                 style={{ width: `${f.relations}%` }}
                              ></div>
                           </div>
                           <span className="text-sm font-medium text-stone-300">{f.relations}/100</span>
                        </div>
                        {f.relations < 40 && (
                           <p className="text-xs text-red-400 mt-2 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Tensão crescendo. Risco de retaliação sazonal elevado.</p>
                        )}
                        <div className="flex gap-2 mt-4">
                           <button 
                             onClick={() => {
                                dispatch({
                                   type: 'SELECT_PRIMARY_ACTION',
                                   payload: {
                                      id: `diplomacy-emissary-${f.id}`,
                                      category: 'Diplomacia',
                                      subAction: `Enviar Emissário: ${f.name}`,
                                      payload: {
                                         type: 'DIPLOMACY_SEND_EMISSARY',
                                         factionId: f.id,
                                         description: `Um emissário foi enviado para negociar com ${f.name}.`,
                                         cost: { prata: 50 },
                                      }
                                   }
                                });
                             }}
                             disabled={!!state.meta.primaryAction || state.resources.prata < 50}
                             className="px-4 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded text-xs text-stone-300 uppercase tracking-widest transition-colors disabled:opacity-50"
                           >
                              Enviar Emissário (-50)
                           </button>
                           <button 
                             onClick={() => {
                                dispatch({
                                   type: 'SELECT_PRIMARY_ACTION',
                                   payload: {
                                      id: `diplomacy-bribe-${f.id}`,
                                      category: 'Diplomacia',
                                      subAction: `Oferecer Prata: ${f.name}`,
                                      payload: {
                                         type: 'DIPLOMACY_OFFER_BRIBE',
                                         factionId: f.id,
                                         description: `Um substancial favor em prata foi concedido a ${f.name}.`,
                                         cost: { prata: 250 },
                                      }
                                   }
                                });
                             }}
                             disabled={!!state.meta.primaryAction || state.resources.prata < 250}
                             className="px-4 py-2 bg-amber-950/20 hover:bg-amber-900/40 border border-amber-900/30 rounded text-xs text-amber-500 uppercase tracking-widest transition-colors drop-shadow-sm disabled:opacity-50"
                           >
                              Oferecer Prata (-250)
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            <div className="col-span-12 md:col-span-4 bg-arkanus-panel border border-arkanus-border rounded p-6 shadow-2xl flex flex-col">
               <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500 mb-4 border-b border-arkanus-border pb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Notificações Recentes
               </h3>
               <div className="flex flex-col gap-4 text-sm mt-4">
                  <div className="bg-[#1a1511] p-3 border-l-2 border-stone-600/50 rounded-r">
                     <span className="text-stone-300">O Príncipe está cobrando uma taxa de proteção extra para este ano (300 prata). Recusar reduzirá fortemente a Relação.</span>
                  </div>
                  <div className="bg-[#1a1511] p-3 border-l-2 border-amber-500/50 rounded-r">
                     <span className="text-stone-300">O Tribunal Arcano parabeniza o domínio por seus recentes estudos, aumentando o Prestígio e a Relação diplomática.</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
