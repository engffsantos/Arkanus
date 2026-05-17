import React from 'react';
import { useGameState } from '../../context/GameContext';
import { HeartPulse, Droplets, Flame, Wind, Mountain, ShieldAlert } from 'lucide-react';

export const HealthScreen: React.FC = () => {
   const { state, dispatch } = useGameState();
   const health = state.health;

   const getHumorColor = (humor: string) => {
      switch (humor) {
         case 'blood': return 'text-red-400';
         case 'choler': return 'text-orange-400';
         case 'melancholy': return 'text-stone-400';
         case 'phlegm': return 'text-blue-400';
         default: return 'text-stone-300';
      }
   };

   return (
      <div className="h-full flex flex-col gap-6">
         <div className="flex justify-between items-center pb-4 border-b border-arkanus-border">
            <h2 className="font-display text-3xl text-arkanus-gold-light tracking-wide flex items-center gap-3">
               <HeartPulse className="w-8 h-8 text-amber-500" /> Saúde & Teoria dos Humores
            </h2>
            <div className="text-right">
               <div className="text-sm uppercase tracking-widest text-arkanus-text-dim">Risco Epidemiológico</div>
               <div className={`font-display text-3xl ${health.epidemicRisk > 40 ? 'text-red-400' : 'text-green-400'}`}>
                  {health.epidemicRisk}%
               </div>
            </div>
         </div>

         <div className="grid grid-cols-12 gap-6 h-full min-h-0 pb-6">
            <div className="col-span-8 grid grid-cols-2 gap-4">
               {/* Humor Dominante */}
               <div className="col-span-2 bg-[#0a0806] border border-arkanus-border rounded p-6 flex flex-col">
                  <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500 mb-6">Equilíbrio Corporal do Feudo</h3>
                  <div className="flex items-center justify-between">
                     <div className="flex flex-col gap-1">
                        <span className="text-stone-400 text-sm">Humor Dominante Atual:</span>
                        <div className={`font-display text-4xl capitalize ${getHumorColor(health.dominantHumor)}`}>
                           {health.dominantHumor === 'blood' && 'Sangue (Sanguíneo)'}
                           {health.dominantHumor === 'choler' && 'Cólera (Colérico)'}
                           {health.dominantHumor === 'melancholy' && 'Melancolia (Melancólico)'}
                           {health.dominantHumor === 'phlegm' && 'Fleuma (Fleumático)'}
                        </div>
                        <p className="text-xs text-stone-500 mt-2 max-w-sm">
                           No mundo arcano medieval, a saúde é regulada por quatro humores. Desequilíbrios causados por clima e más condições geram doenças, que levam à morte se não contidas pelos boticários.
                        </p>
                     </div>
                     <div className="w-24 h-24 rounded-full border-4 border-stone-800 flex items-center justify-center p-4 bg-stone-900/50 text-stone-600">
                        {health.dominantHumor === 'blood' && <Droplets className="w-12 h-12 text-red-500/50" />}
                        {health.dominantHumor === 'choler' && <Flame className="w-12 h-12 text-orange-500/50" />}
                        {health.dominantHumor === 'melancholy' && <Mountain className="w-12 h-12 text-stone-500/50" />}
                        {health.dominantHumor === 'phlegm' && <Wind className="w-12 h-12 text-blue-500/50" />}
                     </div>
                  </div>
               </div>

               {/* Metrics */}
               <div className="bg-[#0a0806] border border-arkanus-border rounded p-5">
                  <div className="flex items-center gap-2 text-stone-300 font-medium mb-4 pb-2 border-b border-stone-800">
                     <Flame className="w-4 h-4 text-orange-400" /> Calor & Frio
                  </div>
                  <div className="flex justify-between text-sm mb-2"><span className="text-stone-400">Excesso de Calor</span><span className="text-stone-200">{health.heat}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-stone-400">Excesso de Frio</span><span className="text-stone-200">{health.cold}</span></div>
               </div>

               <div className="bg-[#0a0806] border border-arkanus-border rounded p-5">
                  <div className="flex items-center gap-2 text-stone-300 font-medium mb-4 pb-2 border-b border-stone-800">
                     <Droplets className="w-4 h-4 text-blue-400" /> Umidade & Secura
                  </div>
                  <div className="flex justify-between text-sm mb-2"><span className="text-stone-400">Excesso Úmido</span><span className="text-stone-200">{health.humidity}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-stone-400">Excesso Seco</span><span className="text-stone-200">{health.dryness}</span></div>
               </div>
            </div>

            <div className="col-span-4 flex flex-col gap-6 w-full">
               <div className="bg-arkanus-panel border border-arkanus-border shadow-inner rounded p-6">
                  <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-arkanus-gold-light mb-6 border-b border-arkanus-border pb-2">Profissionais de Cura</h3>
                  
                  <div className="space-y-4">
                     <div className="flex justify-between items-center bg-[#0a0806] p-3 border border-stone-800 rounded">
                        <span className="text-stone-400 text-sm">Médicos Universitários</span>
                        <span className="font-display text-xl text-stone-200">{health.physicians}</span>
                     </div>
                     <div className="flex justify-between items-center bg-[#0a0806] p-3 border border-stone-800 rounded">
                        <span className="text-stone-400 text-sm">Boticários Locais</span>
                        <span className="font-display text-xl text-stone-200">{health.apothecaries}</span>
                     </div>
                     <button 
                       onClick={() => {
                          dispatch({
                             type: 'SELECT_PRIMARY_ACTION',
                             payload: {
                                id: 'health-prophylaxis',
                                category: 'Saúde Pública',
                                subAction: 'Profilaxia',
                                payload: {
                                  type: 'HEALTH_PREPARE_PROPHYLAXIS',
                                  description: 'Profilaxia e quarentena preparadas.',
                                  cost: { prata: 80 },
                                  effects: [
                                     { target: 'epidemicRisk', value: -10 },
                                     { target: 'publicHealth', value: 5 }
                                  ]
                                }
                             }
                          });
                       }}
                       disabled={state.resources.prata < 80 || !!state.meta.primaryAction}
                       className="w-full py-3 bg-stone-900 border border-stone-700 hover:border-amber-700/50 text-amber-500 uppercase tracking-widest text-xs rounded transition-colors disabled:opacity-50"
                     >
                       Preparar Profilaxia (-80 Prata)
                     </button>
                  </div>

                  {health.epidemicRisk > 40 && (
                     <div className="mt-6 p-4 border border-red-900/50 bg-red-950/20 rounded flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
                        <div>
                           <h4 className="text-sm text-red-400 uppercase tracking-widest font-medium mb-1">Alerta Epidêmico</h4>
                           <p className="text-xs text-stone-400 leading-relaxed">Risco de surto elevado. Aumente número de boticários, limpe fôssas (políticas de governança) ou extraia ervas.</p>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};
