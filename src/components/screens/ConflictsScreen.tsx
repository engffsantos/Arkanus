import React from 'react';
import { useGameState } from '../../context/GameContext';
import { Swords, Goal, Gavel, Scale, AlertTriangle } from 'lucide-react';

export const ConflictsScreen: React.FC = () => {
   const { state, dispatch } = useGameState();

   const conflicts = state.conflicts?.activeConflicts || (Array.isArray(state.conflicts) ? state.conflicts : []);
   
   const tribunalYearsRemaining = 7 - (state.meta.year % 7);

   return (
      <div className="h-full flex flex-col gap-6">
         <div className="flex justify-between items-center pb-4 border-b border-arkanus-border">
            <h2 className="font-display text-3xl text-arkanus-gold-light tracking-wide flex items-center gap-3">
               <Swords className="w-8 h-8 text-amber-500" /> Conflitos & Tribunais
            </h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full min-h-0">
            <div className="col-span-12 md:col-span-8 bg-arkanus-panel border border-arkanus-border rounded p-6 shadow-inner flex flex-col gap-4 overflow-y-auto">
               <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-arkanus-text-dim border-b border-arkanus-border pb-2 mb-2">Disputas Ativas</h3>
               
               {conflicts.map(c => (
                  <div key={c.id} className="p-5 bg-[#0a0806] border border-red-900/30 rounded flex flex-col gap-3 relative overflow-hidden group hover:border-red-500/50 transition-colors">
                     <div className="absolute right-0 top-0 h-full w-2 bg-red-900/50"></div>
                     <div className="flex justify-between items-start">
                        <div>
                           <h4 className="font-display text-2xl text-stone-200">{c.title}</h4>
                           <span className="text-xs uppercase tracking-widest text-stone-500 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">{c.type}</span>
                        </div>
                        <div className="bg-red-950/40 text-red-400 px-3 py-1 rounded text-xs uppercase tracking-widest flex items-center gap-2 border border-red-900/50">
                           <AlertTriangle className="w-3 h-3" /> Severidade: {c.severity}
                        </div>
                     </div>
                     <p className="text-sm font-serif text-stone-400 mt-2">
                        Oponente: <span className="text-stone-300 font-medium">{c.opponent}</span>
                     </p>
                     
                     <div className="mt-4 flex gap-3">
                        <button 
                          onClick={() => {
                             dispatch({
                                type: 'SELECT_PRIMARY_ACTION',
                                payload: {
                                   id: `conflict-prepare-${c.id}`,
                                   category: 'Conflito',
                                   subAction: `Preparar Defesa`,
                                   payload: {
                                      type: 'CONFLICT_PREPARE_DEFENSE',
                                      conflictId: c.id,
                                      description: `Defesa jurídica e mística preparada contra ${c.opponent}.`,
                                      cost: { prata: 100 },
                                      effects: [ { target: 'loyalty', value: 5 } ]
                                   }
                                }
                             });
                          }}
                          disabled={!!state.meta.primaryAction || state.resources.prata < 100}
                          className="px-4 py-2 bg-stone-900 border border-stone-700 hover:bg-stone-800 rounded uppercase tracking-widest text-[10px] text-stone-300 transition-colors disabled:opacity-50"
                        >
                           Preparar Defesa (-100 Prata)
                        </button>
                        <button 
                          onClick={() => {
                             dispatch({
                                type: 'SELECT_PRIMARY_ACTION',
                                payload: {
                                   id: `conflict-duel-${c.id}`,
                                   category: 'Conflito',
                                   subAction: `Duelo Mágico`,
                                   payload: {
                                      type: 'CONFLICT_RESOLVE_DUEL',
                                      conflictId: c.id,
                                      description: `Duelo de feitiçaria invocado contra líder de ${c.opponent}.`,
                                   }
                                }
                             });
                          }}
                          disabled={!!state.meta.primaryAction}
                          className="px-4 py-2 bg-stone-900 border border-stone-700 hover:bg-red-900/50 rounded uppercase tracking-widest text-[10px] text-red-400 transition-colors disabled:opacity-50"
                        >
                           Desafiar para Certâmen
                        </button>
                     </div>
                  </div>
               ))}
               {conflicts.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center opacity-40 py-12">
                     <Scale className="w-16 h-16 text-stone-600 mb-4" />
                     <h3 className="font-display text-2xl text-stone-300">Paz Arcana</h3>
                     <p className="text-sm text-stone-500 mt-2">Nenhuma disputa formal aberta no momento.</p>
                  </div>
               )}
            </div>

            <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
               <div className="bg-[#0a0806] border border-arkanus-border rounded p-6 shadow-inner flex flex-col h-full">
                  <h3 className="font-display text-xl text-amber-300 mb-4 flex items-center gap-2 border-b border-arkanus-border pb-2"><Gavel className="w-5 h-5"/> Próximo Tribunal</h3>
                  <div className="mt-4 flex-1">
                     <div className="text-center bg-[#1a1511] border border-stone-800 rounded p-4 mb-4">
                        <div className="text-5xl font-display text-arkanus-gold mb-1">{tribunalYearsRemaining}</div>
                        <div className="text-xs uppercase tracking-widest text-stone-500">Anos Restantes</div>
                     </div>
                     <p className="text-xs text-stone-400 font-serif leading-relaxed italic text-center px-4">
                        A cada sete anos, os magos da região se reúnem para julgar crimes, arbitrar disputas de Vis e reafirmar a Lei Periférica. Chegar despreparado é morte política.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
