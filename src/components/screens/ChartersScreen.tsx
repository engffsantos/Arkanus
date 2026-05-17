import React, { useState } from 'react';
import { useGameState } from '../../context/GameContext';
import { FileText, Sparkles, Cross, Flame } from 'lucide-react';

export const ChartersScreen: React.FC = () => {
   const { state, dispatch } = useGameState();
   const [showNewCharterModal, setShowNewCharterModal] = useState(false);
   const [newCharterType, setNewCharterType] = useState('sacro');

   const charter = state.charters?.activeCharter;

   const handleExtractVis = () => {
      if (window.confirm('Esta ação consumirá toda a estação e destruirá a conexão simpática. Deseja continuar?')) {
         dispatch({
            type: 'SELECT_PRIMARY_ACTION',
            payload: {
               id: 'charter-extract',
               category: 'Território',
               subAction: 'Extrair Essência do Foral',
               payload: {
                  type: 'EXTRACT_CHARTER_ESSENCIA',
                  description: 'Essência Rego extraída do Foral. Conexão simpática destruída.'
               }
            }
         });
      }
   }

   const handleEmitCharter = () => {
      dispatch({
         type: 'DO_ACTION',
         payload: {
            type: 'EMIT_CHARTER',
            payload: { type: newCharterType }
         }
      });
      setShowNewCharterModal(false);
   }

   if (!charter) {
      return (
         <div className="h-full flex flex-col gap-6 items-center justify-center text-stone-500">
            <p>Nenhum foral ativo encontrado no estado atual.</p>
            <button 
               onClick={() => setShowNewCharterModal(true)}
               className="mt-4 px-6 py-2 border border-dashed border-stone-800 hover:border-amber-500/50 rounded text-stone-400 hover:text-amber-400 transition-colors uppercase tracking-widest text-xs font-medium"
            >
               + Emitir Novo Foral
            </button>
            {showNewCharterModal && (
               <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4">
               {/* Simplified missing state modal handling if needed, or implement full modal below */}
                  Emita um novo foral
               </div>
            )}
         </div>
      );
   }

   return (
      <div className="h-full flex flex-col gap-6">
         <div className="flex justify-between items-center pb-4 border-b border-arkanus-border">
            <h2 className="font-display text-3xl text-arkanus-gold-light tracking-wide flex items-center gap-3">
               <FileText className="w-8 h-8 text-amber-500" /> Forais e Direitos de Cidadania
            </h2>
            <div className="text-right">
               <div className="text-sm uppercase tracking-widest text-arkanus-text-dim">Cidadãos Oficiais</div>
               <div className="font-display text-3xl text-stone-200">
                  {charter.citizens}
               </div>
            </div>
         </div>

         <div className="grid grid-cols-12 gap-6 h-full min-h-0">
            <div className="col-span-8 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2">
                  <div className="bg-[#0a0806] border border-arkanus-border rounded p-6 shadow-inner flex justify-between items-center">
                     <div>
                        <div className="flex items-center gap-2 mb-2">
                           <h3 className="font-display text-xl text-stone-200 capitalize">Foral {charter.type}</h3>
                           {charter.sympatheticConnectionActive && <span className="px-2 py-0.5 rounded border border-stone-700 bg-stone-900 text-stone-400 text-[10px] uppercase tracking-widest">Conexão Simpática</span>}
                        </div>
                        <div className="text-sm text-stone-500">
                           Governa {charter.citizens} cidadãos de {charter.eligibleResidents} elegíveis no feudo.
                        </div>
                        <div className="flex gap-4 mt-4">
                           <div className="text-xs text-fuchsia-400">Aura Arcana {charter.auraArcanaEffect >= 0 ? '+' : ''}{charter.auraArcanaEffect}</div>
                           <div className="text-xs text-blue-400">Aura Sacra {charter.auraSacraEffect >= 0 ? '+' : ''}{charter.auraSacraEffect}</div>
                        </div>
                     </div>
                     <div className="flex flex-col gap-2">
                        <button className="px-4 py-2 bg-stone-900 border border-stone-800 hover:border-amber-900/50 rounded uppercase tracking-widest text-[10px] text-stone-400 transition-colors">Revisar Foral</button>
                        {!charter.extractedEssencia && charter.sympatheticConnectionActive && (
                           <button 
                             onClick={handleExtractVis}
                             disabled={!!state.meta.primaryAction}
                             className="px-4 py-2 bg-fuchsia-950/20 border border-fuchsia-900/30 hover:border-fuchsia-500/50 rounded uppercase tracking-widest text-[10px] text-fuchsia-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                           >
                              Extrair Essência Rego
                           </button>
                        )}
                     </div>
                  </div>
               
               <button 
                  onClick={() => setShowNewCharterModal(true)}
                  className="w-full py-4 border border-dashed border-stone-800 hover:border-amber-500/50 rounded text-stone-500 hover:text-amber-400 transition-colors uppercase tracking-widest text-xs font-medium"
               >
                  + Emitir Novo Foral (-250 Prata)
               </button>
            </div>

            <div className="col-span-4 flex flex-col gap-4">
               <div className="bg-[#0a0806] border border-arkanus-border rounded p-5 flex flex-col gap-4">
                  <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-arkanus-gold-light border-b border-arkanus-border pb-2">Balanço de Auras</h3>
                  
                  <div className="flex items-center justify-between p-3 bg-fuchsia-950/10 border border-fuchsia-900/20 rounded">
                     <span className="text-stone-300 text-sm flex items-center gap-2"><Sparkles className="w-4 h-4 text-fuchsia-400"/> Aura Arcana</span>
                     <span className="font-display text-xl text-fuchsia-300">{state.covenant.auraArcana}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-950/10 border border-blue-900/20 rounded">
                     <span className="text-stone-300 text-sm flex items-center gap-2"><Cross className="w-4 h-4 text-blue-400"/> Aura Sacra</span>
                     <span className="font-display text-xl text-blue-300">{state.covenant.auraSacra}</span>
                  </div>
               </div>
               
               <div className="p-4 bg-[#1a1511] border border-amber-900/40 rounded text-xs text-stone-500 font-serif italic">
                  Conceder cidadania formaliza os servos sob as leis arcanas. Isso cria obrigações, mas permite invocar Conexões Simpáticas para magias defensivas coletivas e extração de Essência pura da autoridade de governo (Rego).
               </div>
            </div>
         </div>

         {showNewCharterModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
               <div className="bg-arkanus-panel border border-arkanus-border shadow-2xl rounded p-6 max-w-sm w-full relative">
                  <h3 className="font-display text-2xl text-amber-300 mb-4 border-b border-arkanus-border pb-4">Emitir Novo Foral</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-arkanus-gold-light mb-1 block">Tipo de Jurisdição</label>
                      <select 
                         value={newCharterType}
                         onChange={e => setNewCharterType(e.target.value)}
                         className="w-full bg-[#0a0806] border border-arkanus-border rounded px-3 py-2 text-arkanus-text focus:outline-none focus:border-amber-500/50 appearance-none"
                      >
                         <option value="sacro">Foral Sacro / Eclesiástico</option>
                         <option value="encantado">Foral Encantado</option>
                         <option value="abissal">Foral Abissal</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4">
                     <button 
                       onClick={handleEmitCharter}
                       disabled={state.resources.prata < 250}
                       className="flex-1 py-2 rounded bg-stone-900 border border-stone-700 text-stone-300 uppercase tracking-widest text-xs hover:border-amber-500 hover:text-amber-400 transition-colors disabled:opacity-50"
                     >
                       Emitir (-250 Prata)
                     </button>
                     <button 
                       onClick={() => setShowNewCharterModal(false)}
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
