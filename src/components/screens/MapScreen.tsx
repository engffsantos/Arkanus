import React, { useState } from 'react';
import { useGameState } from '../../context/GameContext';
import { Map as MapIcon, MapPin, Zap, Coins, Users, Search, AlertCircle } from 'lucide-react';

export const MapScreen: React.FC = () => {
   const { state, dispatch } = useGameState();
   
   const locations: any[] = state.territory?.locations || (Array.isArray(state.territory) ? state.territory : []);

   const [selectedLoc, setSelectedLoc] = useState<any>(locations[0]);

   return (
      <div className="h-full flex flex-col gap-6">
         <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 pb-4 border-b border-arkanus-border">
            <h2 className="font-display text-3xl text-arkanus-gold-light tracking-wide flex items-center gap-3">
               <MapIcon className="w-8 h-8 text-amber-500" /> Mapa do Território
            </h2>
            <div className="text-sm text-arkanus-text-dim uppercase tracking-widest flex gap-4">
               <div>Total de Locais: <span className="text-stone-300">{locations.length}</span></div>
               <div>Tensão Média: <span className="text-stone-300">{(locations.length > 0 ? (locations.reduce((a: number, b: any) => a + b.risk, 0) / locations.length) : 0).toFixed(1)}%</span></div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full min-h-0">
            {/* Lista/Pins de Locais */}
            <div className="col-span-12 md:col-span-8 bg-[#0a0806] border border-arkanus-border rounded p-6 shadow-inner relative overflow-hidden flex flex-col">
               <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
               
               <h3 className="font-medium uppercase tracking-[0.2em] text-arkanus-text-dim mb-6 z-10">Levantamento Cartográfico</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 z-10 w-full overflow-y-auto pr-2 custom-scrollbar">
                  {locations.map(loc => (
                     <button 
                        key={loc.id}
                        onClick={() => setSelectedLoc(loc)}
                        className={`p-4 border text-left rounded transition-all flex flex-col gap-2 ${selectedLoc?.id === loc.id ? 'bg-amber-950/30 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.15)]' : 'bg-[#1a1511] border-stone-800 hover:border-amber-900/50'}`}
                     >
                        <div className="flex items-start justify-between">
                           <div>
                              <h4 className={`font-display text-lg ${selectedLoc?.id === loc.id ? 'text-amber-300' : 'text-stone-200'}`}>{loc.name}</h4>
                              <p className="text-xs uppercase tracking-widest text-stone-500 mt-1">{loc.type} (Nv. {loc.level})</p>
                           </div>
                           <MapPin className={`w-5 h-5 ${selectedLoc?.id === loc.id ? 'text-amber-500' : 'text-stone-600'}`} />
                        </div>
                        {loc.risk > 0 && (
                           <div className="text-xs text-red-400 mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Risco: {loc.risk}%</div>
                        )}
                     </button>
                  ))}
               </div>
            </div>

            {/* Detalhe do Local Selecionado */}
            <div className="col-span-12 md:col-span-4 bg-arkanus-panel border border-arkanus-border shadow-2xl rounded p-6 flex flex-col">
               {selectedLoc ? (
                  <div className="flex flex-col h-full">
                     <div className="mb-6 border-b border-stone-800 pb-4">
                        <h3 className="font-display text-2xl text-amber-200 mb-1">{selectedLoc.name}</h3>
                        <p className="text-sm text-stone-500 uppercase tracking-widest">{selectedLoc.type}</p>
                     </div>

                     <div className="space-y-6 flex-1">
                        <div>
                           <div className="text-xs text-stone-400 uppercase tracking-[0.2em] mb-1">Status Report</div>
                           <p className="text-sm text-stone-300 leading-relaxed font-serif">{selectedLoc.desc}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="bg-[#0a0806] border border-stone-800 p-3 rounded">
                              <div className="text-xs text-stone-500 uppercase tracking-widest mb-1">Aura</div>
                              <div className="text-sm font-medium capitalize text-stone-300">{selectedLoc.aura}</div>
                           </div>
                           <div className="bg-[#0a0806] border border-stone-800 p-3 rounded">
                              <div className="text-xs text-stone-500 uppercase tracking-widest mb-1">Risco</div>
                              <div className="text-sm font-medium text-stone-300">{selectedLoc.risk}%</div>
                           </div>
                        </div>
                        
                        <div className="bg-[#1a1511] border border-amber-900/40 p-4 rounded mt-4 text-xs font-serif italic text-stone-400 text-center">
                           "A exploração física e arcana dos nossos arredores garante nossa sobrevivência nas estações frias."
                        </div>
                     </div>

                     <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-stone-800">
                        <button 
                          onClick={() => {
                             dispatch({
                                type: 'SELECT_PRIMARY_ACTION',
                                payload: {
                                  id: 'map-investigate',
                                  category: 'Território',
                                  subAction: 'Investigar Local',
                                  payload: {
                                    type: 'MAP_INVESTIGATE',
                                    description: `Terrenos mapeados e eventos resolvidos em: ${selectedLoc.name}.`,
                                    cost: { prata: 20 },
                                  }
                                }
                             });
                          }}
                          disabled={!!state.meta.primaryAction || state.resources.prata < 20}
                          className="w-full py-3 bg-stone-900 border border-stone-700 hover:border-amber-500/50 rounded uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 text-stone-300 hover:text-amber-400 disabled:opacity-50"
                        >
                           <Search className="w-4 h-4" /> Investigar Local (-20 Prata)
                        </button>
                     </div>
                  </div>
               ) : (
                  <div className="flex-1 flex items-center justify-center text-stone-500 uppercase tracking-widest text-sm text-center">
                     Selecione um local no mapa para inspecionar
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};
