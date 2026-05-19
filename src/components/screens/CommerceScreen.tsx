import React from 'react';
import { useGameState } from '../../context/GameContext';
import { ArrowRightLeft, Map, Package } from 'lucide-react';

export const CommerceScreen: React.FC = () => {
   const { state, dispatch } = useGameState();

   const handleSendCaravan = () => {
      dispatch({
         type: 'SELECT_PRIMARY_ACTION',
         payload: {
            id: 'commerce-caravan',
            category: 'Comércio',
            subAction: 'Enviar Caravana',
            payload: {
               type: 'COMMERCE_SEND_CARAVAN',
               description: 'Caravana enviada para Feira de Champagne.',
               cost: { prata: 100 }
            }
         }
      });
   };

   return (
      <div className="h-full flex flex-col gap-6">
         <div className="flex justify-between items-center pb-4 border-b border-arkanus-border">
            <h2 className="font-display text-3xl text-arkanus-gold-light tracking-wide flex items-center gap-3">
               <ArrowRightLeft className="w-8 h-8 text-amber-500" /> Comércio e Feiras
            </h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full min-h-0">
            <div className="col-span-12 md:col-span-8 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2">
               <div className="bg-[#0a0806] border border-arkanus-border rounded p-6 shadow-inner">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <h3 className="font-display text-2xl text-amber-300">Feira de Champagne</h3>
                        <p className="text-sm text-stone-500 uppercase tracking-widest mt-1">Mercado Internacional</p>
                     </div>
                  </div>
                  <p className="text-sm text-stone-400 mb-6 max-w-lg leading-relaxed">
                     A principal feira da Europa reúne mercadores, banqueiros e magos disfarçados. O melhor lugar para escoar alta qualidade e encontrar reagentes raros.
                  </p>
                  <div className="flex gap-4">
                     <button 
                       onClick={handleSendCaravan}
                       disabled={state.resources.prata < 100 || !!state.meta.primaryAction}
                       className="px-6 py-2 bg-amber-900/30 border border-amber-600/50 text-amber-300 rounded uppercase tracking-widest text-xs transition-colors hover:bg-amber-900/50 disabled:opacity-50"
                     >
                        Enviar Caravana (-100 Prata)
                     </button>
                     <button className="px-6 py-2 bg-stone-900 border border-stone-700 text-stone-300 rounded uppercase tracking-widest text-xs transition-colors hover:bg-stone-800">
                        Comprar Materiais
                     </button>
                  </div>
               </div>

               {(state.commerce?.caravans || []).map(c => (
                  <div key={c.id} className="bg-[#0a0806] border border-arkanus-border rounded p-6 shadow-inner opacity-70">
                     <div className="flex justify-between items-start mb-4">
                        <div>
                           <h3 className="font-display text-2xl text-stone-300">{c.destination}</h3>
                           <p className="text-sm text-stone-500 uppercase tracking-widest mt-1">
                              {c.status === 'active' ? 'Rota Ativa' : 'Retornando'}
                           </p>
                        </div>
                     </div>
                     <div className="text-sm text-amber-400/80 mb-4 flex items-center gap-2">
                        <Package className="w-4 h-4" /> 
                        {c.status === 'active' ? `Retorna na estação: ${c.returnSeason} / ${c.returnYear}` : 'Mercadorias descarregadas'}
                     </div>
                  </div>
               ))}
               
            </div>

            <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
               <div className="bg-arkanus-panel border border-arkanus-border rounded p-5 shadow-inner">
                  <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-arkanus-gold-light mb-4 border-b border-arkanus-border pb-2">Suprimentos Cautelosos</h3>
                  <div className="space-y-3">
                     <div className="flex justify-between text-sm">
                        <span className="text-stone-400">Prata Líquida</span>
                        <span className="text-amber-300 font-medium">{Math.floor(state.resources.prata)}</span>
                     </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-stone-400">Caravanas Regressistas</span>
                        <span className="text-stone-200">{(state.commerce?.caravans || []).filter(c => c.status === 'active').length}</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
