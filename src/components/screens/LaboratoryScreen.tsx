import React, { useState } from 'react';
import { useGameState } from '../../context/GameContext';
import { LabProject } from '../../types/game';
import { FlaskConical, Play, Pause, Check, Plus, AlertTriangle } from 'lucide-react';

export const LaboratoryScreen: React.FC = () => {
  const { state, dispatch } = useGameState();
  const lab = state.laboratory;
  
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({
     name: '',
     type: 'feitiço',
     technique: 'Creo',
     form: 'Ignem',
     level: 10,
  });

  // Deriving the "Lab Total" loosely based on prompt formulas
  // Total de Laboratório = Inteligência + Teoria Arcana + Técnica + Forma + Modificadores do Laboratório + Modificadores de Aura + Bônus de Materiais
  // Since we don't have all attributes mapped perfectly yet, we'll use a simplified calc
  const baseLabTotal = 15 + lab.level + lab.quality + (state.covenant.auraArcana / 10);

  return (
    <div className="h-full flex flex-col gap-6">
       {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <h2 className="font-display text-3xl text-arkanus-gold-light tracking-wide flex items-center gap-3">
             <FlaskConical className="w-8 h-8 text-amber-500" /> Laboratório Arcano
          </h2>
          <p className="text-arkanus-text-dim mt-2 font-serif italic max-w-2xl">
            "A transformação da Vontade em Realidade através do crivo da Teoria e da repetição extenuante."
          </p>
        </div>

        <div className="flex gap-4 shrink-0">
           <div className="bg-arkanus-panel border border-arkanus-border rounded p-3 text-center min-w-[100px]">
              <div className="text-xs text-arkanus-text-dim uppercase tracking-widest mb-1">Essência Restante</div>
              <div className="font-display text-xl text-fuchsia-400 font-bold">{state.resources.essencia.total}</div>
           </div>
           <div className="bg-arkanus-panel border border-arkanus-border rounded p-3 text-center min-w-[100px] shadow-[0_0_15px_rgba(245,158,11,0.1)]">
              <div className="text-xs text-arkanus-text-dim uppercase tracking-widest mb-1">Total Base</div>
              <div className="font-display text-xl text-amber-300 font-bold">{Math.floor(baseLabTotal)}</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full min-h-0">

         {/* Left Column: Stats & Modifiers */}
         <div className="col-span-12 md:col-span-4 flex flex-col gap-6">
            <div className="bg-arkanus-panel border border-arkanus-border rounded p-6 shadow-inner">
               <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-arkanus-gold mb-6 border-b border-arkanus-border pb-2">Status da Oficina</h3>
               
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <span className="text-arkanus-text-dim">Nível de Equipamento</span>
                     <span className="font-display text-lg">{lab.level}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-arkanus-text-dim">Qualidade Geral</span>
                     <span className="font-display text-lg">{lab.quality >= 0 ? `+${lab.quality}` : lab.quality}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-arkanus-text-dim">Segurança Arcana</span>
                     <span className="font-display text-lg text-green-400">{(lab.safety > 0 ? '+' : '')}{lab.safety}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-arkanus-text-dim">Aura Arcana Local</span>
                     <span className="font-display text-lg text-fuchsia-300">{(state.covenant.auraArcana / 10).toFixed(1)}</span>
                  </div>
               </div>
            </div>

            <button 
               onClick={() => {
                   dispatch({
                     type: 'SELECT_PRIMARY_ACTION',
                     payload: {
                        id: 'lab',
                        category: 'Laboratório',
                        subAction: 'Destilar Essência Arcana',
                        payload: {
                          type: 'LAB_DISTILL_ESSENCIA',
                          description: 'Destilou Essência Arcana das imediações da Soberania.'
                        }
                     }
                  });
               }}
               disabled={!!state.meta.primaryAction}
               className="w-full py-3 bg-stone-900 border border-stone-700 hover:border-amber-500/50 text-amber-500 uppercase tracking-widest text-xs rounded transition-colors mt-2 disabled:opacity-50"
            >
               Destilar Essência Arcana
            </button>

            <button 
              onClick={() => setShowNewProjectModal(true)}
              className="mt-2 py-4 rounded border border-amber-500/50 hover:bg-amber-500/10 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all flex items-center justify-center gap-2 text-amber-300 uppercase tracking-widest font-medium"
            >
               <Plus className="w-5 h-5" /> Iniciar Novo Experimento
            </button>
         </div>

         {/* Center/Right Column: Projects */}
         <div className="col-span-12 md:col-span-8 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
            
            {(lab.activeProjects || []).length === 0 ? (
               <div className="flex-1 bg-arkanus-panel border border-dashed border-stone-800 rounded flex flex-col items-center justify-center p-12 text-center opacity-60">
                 <FlaskConical className="w-12 h-12 text-stone-600 mb-4" />
                 <h3 className="font-display text-2xl text-stone-400 mb-2">Bancada Vazia</h3>
                 <p className="text-stone-500 max-w-sm">Nenhum experimento conduzido atualmente. O conhecimento estagna quando o fogo esfria.</p>
               </div>
            ) : (
               <div className="space-y-4">
                  <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-arkanus-text-dim">Projetos Ativos & Pausados</h3>
                  {(lab.activeProjects || []).map(project => (
                     <ProjectCard key={project.id} project={project} dispatch={dispatch} />
                  ))}
               </div>
            )}

            {(lab.completedProjects || []).length > 0 && (
               <div className="mt-8 space-y-4">
                  <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-arkanus-text-dim">Grimório de Descobertas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {(lab.completedProjects || []).map(project => (
                        <div key={project.id} className="bg-[#1a1511] border border-stone-800 rounded p-4 flex items-center gap-4 opacity-70">
                           <div className="p-2 bg-stone-900 rounded-full text-stone-500"><Check className="w-4 h-4" /></div>
                           <div>
                              <div className="text-stone-300 font-medium">{project.name}</div>
                              <div className="text-xs text-stone-500 capitalize">{project.type}</div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </div>
      </div>

       {showNewProjectModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
             <div className="bg-arkanus-panel border border-arkanus-border shadow-2xl rounded p-6 max-w-lg w-full relative">
                <h3 className="font-display text-2xl text-amber-300 mb-4 border-b border-arkanus-border pb-4">Ideação de Experimento</h3>
                
                <p className="text-arkanus-text-dim text-sm italic mb-6">
                  Você definirá os parâmetros de um novo projeto. Para avançá-lo, lembre-se de trabalhar nele através de uma Ação Sazonal.
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-arkanus-gold-light mb-1 block">Nome do Experimento</label>
                    <input 
                      type="text" 
                      value={newProject.name}
                      onChange={e => setNewProject({...newProject, name: e.target.value})}
                      className="w-full bg-[#0a0806] border border-arkanus-border rounded px-3 py-2 text-arkanus-text focus:outline-none focus:border-amber-500/50"
                      placeholder="Ex: Lança de Chamas"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-arkanus-gold-light mb-1 block">Tipo</label>
                      <select 
                         value={newProject.type}
                         onChange={e => setNewProject({...newProject, type: e.target.value})}
                         className="w-full bg-[#0a0806] border border-arkanus-border rounded px-3 py-2 text-arkanus-text focus:outline-none focus:border-amber-500/50 appearance-none"
                      >
                         <option value="feitiço">Feitiço</option>
                         <option value="item">Encantar Item</option>
                         <option value="poção">Produzir Poção</option>
                         <option value="pesquisa">Pesquisa Arcana</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-arkanus-gold-light mb-1 block">Nível</label>
                      <input 
                        type="number" 
                        value={newProject.level}
                        onChange={e => setNewProject({...newProject, level: Number(e.target.value)})}
                        className="w-full bg-[#0a0806] border border-arkanus-border rounded px-3 py-2 text-arkanus-text focus:outline-none focus:border-amber-500/50"
                        min="5" max="100" step="5"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-arkanus-gold-light mb-1 block">Técnica</label>
                      <select 
                         value={newProject.technique}
                         onChange={e => setNewProject({...newProject, technique: e.target.value})}
                         className="w-full bg-[#0a0806] border border-arkanus-border rounded px-3 py-2 text-arkanus-text focus:outline-none focus:border-amber-500/50 appearance-none"
                      >
                         {['Creo', 'Intellego', 'Muto', 'Perdo', 'Rego'].map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-arkanus-gold-light mb-1 block">Forma</label>
                      <select 
                         value={newProject.form}
                         onChange={e => setNewProject({...newProject, form: e.target.value})}
                         className="w-full bg-[#0a0806] border border-arkanus-border rounded px-3 py-2 text-arkanus-text focus:outline-none focus:border-amber-500/50 appearance-none"
                      >
                         {['Animal', 'Aquam', 'Auram', 'Corpus', 'Herbam', 'Ignem', 'Imaginem', 'Mentem', 'Terram', 'Vim'].map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                   <button 
                     onClick={() => {
                       if (!newProject.name) return;
                       dispatch({
                         type: 'DO_ACTION',
                         payload: {
                           type: 'LAB_NEW_PROJECT',
                           payload: {
                             id: Date.now().toString(),
                             name: newProject.name,
                             type: newProject.type,
                             technique: newProject.technique,
                             form: newProject.form,
                             level: newProject.level,
                             requiredTotal: newProject.level * 3, // simplified mapping
                             accumulatedProgress: 0,
                             essenciaCost: Math.ceil(newProject.level / 10),
                             risk: Math.max(0, newProject.level - baseLabTotal),
                             status: 'active'
                           }
                         }
                       });
                       setShowNewProjectModal(false);
                     }}
                     className="flex-1 py-2 rounded bg-amber-900 text-amber-100 uppercase tracking-widest text-xs hover:bg-amber-800 transition-colors"
                   >
                     Criar Experimento
                   </button>
                   <button 
                     onClick={() => setShowNewProjectModal(false)}
                     className="flex-1 py-2 rounded bg-stone-800 text-stone-300 uppercase tracking-widest text-xs hover:bg-stone-700 transition-colors"
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

const ProjectCard: React.FC<{ project: LabProject; dispatch: any }> = ({ project, dispatch }) => {
   const progressPercent = Math.min(100, (project.accumulatedProgress / project.requiredTotal) * 100);

   return (
      <div className="bg-[#0a0806] border border-arkanus-border hover:border-amber-900/50 rounded p-5 transition-colors relative overflow-hidden group">
         {/* Background Progress Bar */}
         <div 
           className="absolute top-0 left-0 bottom-0 bg-amber-950/20 z-0 transition-all duration-1000 ease-out" 
           style={{ width: `${progressPercent}%` }}
         ></div>
         <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none z-0">
            <FlaskConical className="w-24 h-24" />
         </div>

         <div className="relative z-10 flex justify-between items-start">
            <div className="flex gap-4 items-start">
               {project.status === 'active' ? (
                  <button 
                     onClick={() => dispatch({ type: 'DO_ACTION', payload: { type: 'LAB_PAUSE_PROJECT', payload: { id: project.id } } })}
                     className="w-10 h-10 rounded bg-amber-900/40 border border-amber-500/50 flex items-center justify-center text-amber-300 hover:bg-amber-800/80 transition-colors shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                     title="Pausar Experimento"
                  >
                     <Pause className="w-5 h-5" />
                  </button>
               ) : (
                  <button 
                     onClick={() => dispatch({ type: 'DO_ACTION', payload: { type: 'LAB_RESUME_PROJECT', payload: { id: project.id } } })}
                     className="w-10 h-10 rounded bg-stone-900 border border-stone-700 flex items-center justify-center text-stone-500 hover:text-amber-500 hover:border-amber-500 transition-colors"
                     title="Retomar Experimento"
                  >
                     <Play className="w-5 h-5 ml-1" />
                  </button>
               )}
               
               <div>
                  <div className="flex items-center gap-2 mb-1">
                     <h4 className="font-display text-xl text-arkanus-text">{project.name}</h4>
                     <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border border-stone-700 text-stone-400 bg-black">
                        {project.type}
                     </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-arkanus-text-dim mt-2">
                     <div className="flex items-center gap-1">
                        <span className="uppercase font-medium text-stone-500">Técnica:</span> {project.technique}
                     </div>
                     <div className="flex items-center gap-1">
                        <span className="uppercase font-medium text-stone-500">Forma:</span> {project.form}
                     </div>
                     <div className="flex items-center gap-1 text-fuchsia-400/70">
                        <span className="uppercase font-medium">Custo Essência:</span> {project.essenciaCost}
                     </div>
                  </div>
               </div>
            </div>

            <div className="text-right">
               <div className="font-display text-2xl text-amber-400">
                  {project.accumulatedProgress} <span className="text-sm text-stone-500">/ {project.requiredTotal}</span>
               </div>
               <div className="text-xs uppercase tracking-widest text-stone-500 mt-1">Progresso</div>
            </div>
         </div>

         {project.risk > 0 && (
            <div className="relative z-10 mt-4 flex items-center gap-2 text-xs text-red-400 bg-red-950/30 p-2 rounded border border-red-900/50 w-fit">
               <AlertTriangle className="w-3 h-3" />
               <span>Risco Experimental: {project.risk}% - Modifique os parâmetros ou foque em segurança.</span>
            </div>
         )}
      </div>
   );
};
