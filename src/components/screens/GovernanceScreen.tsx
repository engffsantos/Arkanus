import React, { useState } from 'react';
import { useGameState } from '../../context/GameContext';
import { Scale, TrendingUp, Shield, Coins, Users, Hammer } from 'lucide-react';

export const GovernanceScreen: React.FC = () => {
  const { state, dispatch } = useGameState();
  const c = state.covenant;

  const handlePolicyChange = (type: string) => {
     if (type === 'invest_health') {
        dispatch({
          type: 'SELECT_PRIMARY_ACTION',
          payload: {
            id: 'gov-health',
            category: 'Governança',
            subAction: 'Investir em Saúde',
            payload: {
              type: 'GOVERNANCE_INVEST_HEALTH',
              description: 'Investimento em saúde e saneamento realizado.',
              cost: { prata: 150 },
              effects: [
                { target: 'publicHealth', value: 5 },
                { target: 'loyalty', value: 2 }
              ]
            }
          }
        });
     } else if (type === 'hire_guards') {
        dispatch({
          type: 'SELECT_PRIMARY_ACTION',
          payload: {
            id: 'gov-guards',
            category: 'Governança',
            subAction: 'Contratar Guardas',
            payload: {
              type: 'GOVERNANCE_HIRE_GUARDS',
              description: 'Reforço na segurança contratado.',
              cost: { prata: 200 },
              effects: [
                { target: 'security', value: 8 },
                { target: 'unrest', value: -5 }
              ]
            }
          }
        });
     }
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex justify-between items-start pb-4 border-b border-arkanus-border">
        <div>
          <h2 className="font-display text-3xl text-arkanus-gold-light tracking-wide flex items-center gap-3">
             <Scale className="w-8 h-8 text-amber-500" /> Sala de Governança
          </h2>
          <p className="text-arkanus-text-dim mt-2 font-serif italic max-w-2xl">
            "Para que os sábios possam estudar os céus, alguém deve administrar a terra."
          </p>
        </div>
        <div className="flex gap-4">
           <div className="bg-arkanus-panel border border-arkanus-border rounded p-3 text-center min-w-[100px] shadow-[0_0_15px_rgba(245,158,11,0.05)]">
              <div className="text-xs text-arkanus-text-dim uppercase tracking-widest mb-1">Tesouro</div>
              <div className="font-display text-xl text-arkanus-gold font-bold">{Math.floor(state.resources.prata)}</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 h-full min-h-0">
         <div className="col-span-8 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
             <div className="bg-[#0a0806] border border-arkanus-border rounded p-6 shadow-inner">
                <h3 className="font-display text-2xl text-amber-300 mb-6 border-b border-arkanus-border pb-3">Políticas Imediatas</h3>
                
                <div className="grid gap-4">
                   <div className="p-4 border border-stone-800 bg-[#1a1511] rounded flex items-center justify-between hover:border-amber-900/40 transition-colors">
                      <div>
                         <h4 className="font-medium text-stone-200 flex items-center gap-2"><HeartPulseIcon className="w-4 h-4 text-red-400" /> Saneamento e Boticários</h4>
                         <p className="text-sm text-stone-500 mt-1">Constrói valas e contrata auxiliares. Aumenta Saúde (+5) e Lealdade (+2).</p>
                      </div>
                      <button 
                        onClick={() => handlePolicyChange('invest_health')}
                        disabled={state.resources.prata < 150 || !!state.meta.primaryAction}
                        className="py-2 px-6 bg-stone-900 border border-stone-700 hover:bg-stone-800 disabled:opacity-50 text-stone-300 uppercase tracking-widest text-xs rounded transition-colors"
                      >
                         Pagar 150 Prata
                      </button>
                   </div>

                   <div className="p-4 border border-stone-800 bg-[#1a1511] rounded flex items-center justify-between hover:border-amber-900/40 transition-colors">
                      <div>
                         <h4 className="font-medium text-stone-200 flex items-center gap-2"><Shield className="w-4 h-4 text-stone-400" /> Guardas e Milícia</h4>
                         <p className="text-sm text-stone-500 mt-1">Arma homens saudáveis do feudo. Aumenta Segurança (+8) e Reduz Revolta (-5).</p>
                      </div>
                      <button 
                         onClick={() => handlePolicyChange('hire_guards')}
                         disabled={state.resources.prata < 200 || !!state.meta.primaryAction}
                         className="py-2 px-6 bg-stone-900 border border-stone-700 hover:bg-stone-800 disabled:opacity-50 text-stone-300 uppercase tracking-widest text-xs rounded transition-colors"
                      >
                         Pagar 200 Prata
                      </button>
                   </div>

                   <div className="p-4 border border-stone-800 bg-[#1a1511] rounded flex items-center justify-between hover:border-amber-900/40 transition-colors">
                      <div>
                         <h4 className="font-medium text-stone-200 flex items-center gap-2"><Hammer className="w-4 h-4 text-stone-400" /> Manutenção do Feudo</h4>
                         <p className="text-sm text-stone-500 mt-1">Repara estruturas. Aumenta Lealdade (+5) e Reduz Revolta (-10). Leva a estação inteira.</p>
                      </div>
                      <button 
                         onClick={() => {
                           dispatch({
                              type: 'SELECT_PRIMARY_ACTION',
                              payload: {
                                id: 'gov-maintain',
                                category: 'Governança',
                                subAction: 'Manutenção',
                                payload: {
                                  type: 'GOVERNANCE_MAINTAIN',
                                  description: 'Manutenção das estruturas do feudo.',
                                  cost: { prata: 100 },
                                  effects: [
                                    { target: 'loyalty', value: 5 },
                                    { target: 'unrest', value: -10 }
                                  ]
                                }
                              }
                           });
                         }}
                         disabled={state.resources.prata < 100 || !!state.meta.primaryAction}
                         className="py-2 px-6 bg-stone-900 border border-stone-700 hover:bg-stone-800 disabled:opacity-50 text-stone-300 uppercase tracking-widest text-xs rounded transition-colors"
                      >
                         Pagar 100 Prata
                      </button>
                   </div>
                   
                   <div className="p-4 border border-stone-800 bg-[#1a1511] rounded flex items-center justify-between hover:border-amber-900/40 transition-colors">
                      <div>
                         <h4 className="font-medium text-stone-200 flex items-center gap-2"><Scale className="w-4 h-4 text-stone-400" /> Aumentar Impostos</h4>
                         <p className="text-sm text-stone-500 mt-1">Força a coleta. Gera Prata imediatamente, mas reduz Lealdade (-15) e aumenta Revolta (+20).</p>
                      </div>
                      <button 
                         onClick={() => {
                           dispatch({
                              type: 'SELECT_PRIMARY_ACTION',
                              payload: {
                                id: 'gov-tax',
                                category: 'Governança',
                                subAction: 'Aumentar Impostos',
                                payload: {
                                  type: 'GOVERNANCE_TAX',
                                  description: 'Cobrança extraordinária de impostos.',
                                  cost: { prata: -300 }, // earns silver immediately
                                  effects: [
                                    { target: 'loyalty', value: -15 },
                                    { target: 'unrest', value: 20 }
                                  ]
                                }
                              }
                           });
                         }}
                         disabled={!!state.meta.primaryAction}
                         className="py-2 px-6 bg-stone-900 border border-stone-700 hover:bg-stone-800 disabled:opacity-50 text-stone-300 uppercase tracking-widest text-xs rounded transition-colors"
                      >
                         Decretar (+300)
                      </button>
                   </div>
                </div>
             </div>
             
             <div className="mt-2 p-4 bg-amber-950/20 border border-amber-900/30 rounded text-sm text-arkanus-text-dim font-serif italic">
                Políticas maiores de economia e governo devem ser executadas através de "Ações Sazonais" na categoria Governança. As políticas aqui representam apenas decretos rápidos financiados pela prata do tesouro.
             </div>
         </div>
         
         <div className="col-span-4 flex flex-col gap-6">
            <div className="bg-arkanus-panel border border-arkanus-border shadow-inner rounded p-5">
               <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-arkanus-gold-light mb-4">Métricas Atuais</h3>
               <div className="space-y-4 text-sm">
                 <div className="flex justify-between items-center pb-2 border-b border-stone-800/50">
                    <span className="text-stone-400">População</span>
                    <span className="font-display text-lg text-stone-200">{Math.floor(c.population)}</span>
                 </div>
                 <div className="flex justify-between items-center pb-2 border-b border-stone-800/50">
                    <span className="text-stone-400">Lealdade</span>
                    <span className="font-display text-lg text-stone-200">{Math.floor(c.loyalty)}%</span>
                 </div>
                 <div className="flex justify-between items-center pb-2 border-b border-stone-800/50">
                    <span className="text-stone-400">Saúde Pública</span>
                    <span className="font-display text-lg text-stone-200">{Math.floor(c.publicHealth)}%</span>
                 </div>
                 <div className="flex justify-between items-center pb-2 border-b border-stone-800/50">
                    <span className="text-stone-400">Segurança Militar</span>
                    <span className="font-display text-lg text-stone-200">{Math.floor(c.security)}%</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-stone-400">Índice de Revolta</span>
                    <span className={`font-display text-lg ${c.unrest > 30 ? 'text-red-400' : 'text-green-400'}`}>{c.unrest}%</span>
                 </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

// Helper for icon since we missed importing HeartPulse initially:
function HeartPulseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
    </svg>
  )
}
