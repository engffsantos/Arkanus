import React, { useState } from 'react';
import { useGameState } from '../../context/GameContext';
import { FlaskConical, Book, Feather, Scale, ArrowRightLeft, Handshake, Swords, Play } from 'lucide-react';

const mainActions = [
  { id: 'lab', label: 'Laboratório', icon: FlaskConical, desc: 'Projetos mágicos e pesquisa.', subActions: ['Criar Feitiço', 'Encantar Item', 'Produzir Poção', 'Pesquisar Fenômeno', 'Melhorar Laboratório'] },
  { id: 'study', label: 'Estudo', icon: Book, desc: 'Aprofunde seus conhecimentos.', subActions: ['Ler Tomo Maior', 'Ler Tratado Menor', 'Estudar Habilidade Mundana', 'Estudar Teoria Arcana'] },
  { id: 'write', label: 'Escrita', icon: Feather, desc: 'Produza novos textos preciosos.', subActions: ['Escrever Tomo Maior', 'Escrever Tratado Menor', 'Copiar Livro', 'Melhorar Manuscrito'] },
  { id: 'gov', label: 'Governança', icon: Scale, desc: 'Administre os recursos do feudo.', subActions: ['Administrar Feudo', 'Reorganizar Servos', 'Investir em Saúde', 'Reforçar Segurança', 'Ajustar Impostos'] },
  { id: 'com', label: 'Comércio', icon: ArrowRightLeft, desc: 'Transforme bens em prata.', subActions: ['Enviar para Feira', 'Comprar Materiais', 'Contratar Mercadores', 'Abrir Rota', 'Vender Excedente'] },
  { id: 'dip', label: 'Diplomacia', icon: Handshake, desc: 'Lide com facções e poderes externos.', subActions: ['Negociar com Nobre', 'Tratar com a Igreja', 'Enviar Emissário', 'Firmar Acordo', 'Reduzir Tensão'] },
  { id: 'war', label: 'Conflito', icon: Swords, desc: 'Resolva disputas pela força ou pela lei.', subActions: ['Defender-se em Tribunal', 'Iniciar Disputa', 'Duelo Regulado', 'Conter Revolta'] },
];

export const ActionsScreen: React.FC = () => {
  const { state, dispatch } = useGameState();
  const [selectedMainAction, setSelectedMainAction] = useState<string | null>(null);
  const [selectedSubAction, setSelectedSubAction] = useState<string | null>(null);

  const activeMainAction = mainActions.find(a => a.id === selectedMainAction);

  const handleSetPrimary = () => {
    if (!selectedMainAction || !selectedSubAction) return;

    dispatch({
      type: 'SELECT_PRIMARY_ACTION',
      payload: {
        id: selectedMainAction,
        category: activeMainAction?.label || 'Ação Sazonal',
        subAction: selectedSubAction,
        payload: {
          type: 'GENERIC_ACTION',
          description: `Soberano planeja a ação: ${selectedSubAction}`
        }
      }
    });
  };

  const currentAction = state.meta.primaryAction;

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex justify-between items-center bg-arkanus-panel border border-arkanus-border p-6 rounded shadow-lg">
        <div>
          <h2 className="font-display text-3xl text-arkanus-gold-light tracking-wide">Ações Sazonais</h2>
          <p className="text-arkanus-text-dim text-sm mt-1 uppercase tracking-widest">{state.meta.season} • Ano {state.meta.year}</p>
        </div>
      </div>

      <div className="flex gap-6 h-full min-h-0">
        
        {/* Main Actions Column */}
        <div className="w-1/3 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar relative">
          {currentAction && (
             <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[1px] flex items-center justify-center p-6 text-center">
             </div>
          )}
          {mainActions.map(action => (
            <button
              key={action.id}
              onClick={() => {
                setSelectedMainAction(action.id);
                setSelectedSubAction(null);
              }}
              disabled={!!currentAction}
              className={`flex flex-col items-start gap-2 p-4 rounded border text-left transition-all ${currentAction ? 'opacity-50' : ''} ${
                selectedMainAction === action.id
                  ? 'bg-amber-900/30 border-amber-500/50 shadow-[inset_4px_0_0_rgba(245,158,11,0.5)]'
                  : 'bg-arkanus-panel border-arkanus-border hover:border-amber-900/50'
              }`}
            >
              <div className="flex items-center gap-3">
                 <div className={`p-2 rounded-full ${selectedMainAction === action.id ? 'bg-amber-500/20 text-amber-400' : 'bg-stone-900 text-stone-400'}`}>
                   <action.icon className="w-5 h-5" />
                 </div>
                 <span className={`font-display text-xl ${selectedMainAction === action.id ? 'text-amber-300' : 'text-arkanus-text'}`}>{action.label}</span>
              </div>
              <span className="text-sm text-arkanus-text-dim">{action.desc}</span>
            </button>
          ))}
        </div>

        {/* Sub-Actions Column */}
        <div className="w-2/3 bg-arkanus-panel border border-arkanus-border rounded p-6 shadow-inner flex flex-col relative overflow-hidden">
           {currentAction ? (
              <div className="relative z-10 flex flex-col h-full items-center justify-center text-center">
                 <div className="p-6 rounded-full bg-amber-500/10 border-2 border-amber-500/50 mb-8 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                    <Play className="w-16 h-16 text-amber-400 ml-2" />
                 </div>
                 <h3 className="font-display text-3xl text-amber-300 mb-2">Ação Definida</h3>
                 <p className="text-lg text-arkanus-gold-light">{currentAction.category} - {currentAction.subAction}</p>
                 <p className="text-sm text-arkanus-text-dim mt-6 max-w-md">Para confirmar a passagem da estação e resolver os efeitos desta ação junto ao restante da soberania, clique em "Avançar" no painel superior.</p>
                 <button 
                    onClick={() => dispatch({ type: 'CANCEL_PRIMARY_ACTION' })}
                    className="mt-8 px-6 py-2 border border-stone-600 hover:border-red-500/50 text-stone-400 hover:text-red-400 rounded uppercase tracking-widest text-xs transition-colors"
                 >
                    Cancelar e Escolher Outra
                 </button>
              </div>
           ) : selectedMainAction && activeMainAction ? (
             <div className="relative z-10 flex flex-col h-full">
               <h3 className="font-display text-2xl text-amber-200 mb-6 flex items-center gap-3 border-b border-arkanus-border pb-4">
                 <activeMainAction.icon className="w-6 h-6" />
                 Estratégias de {activeMainAction.label}
               </h3>
               
               <div className="grid grid-cols-2 gap-4 auto-rows-max">
                 {activeMainAction.subActions.map(subAction => (
                   <button
                     key={subAction}
                     onClick={() => setSelectedSubAction(subAction)}
                     className={`p-5 rounded border text-left flex flex-col gap-2 transition-all ${
                       selectedSubAction === subAction
                         ? 'bg-amber-500/10 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                         : 'bg-[#1a1511] border-stone-800 hover:border-amber-700/50'
                     }`}
                   >
                     <span className={`font-medium ${selectedSubAction === subAction ? 'text-amber-300' : 'text-arkanus-text'}`}>{subAction}</span>
                     <div className="text-xs text-arkanus-text-dim flex flex-wrap gap-2 mt-auto">
                        <span className="px-2 py-1 bg-black/40 rounded border border-stone-800">1 Estação</span>
                        <span className="px-2 py-1 bg-black/40 rounded border border-stone-800">Risco Médio</span>
                     </div>
                   </button>
                 ))}
               </div>

               {selectedSubAction && (
                 <div className="mt-auto pt-6 flex justify-end pb-2">
                    <button 
                       onClick={handleSetPrimary}
                       className="px-8 py-3 bg-arkanus-gold text-stone-900 rounded font-medium uppercase tracking-widest shadow-[0_0_15px_rgba(202,138,4,0.3)] hover:bg-amber-300 transition-all flex items-center gap-2"
                    >
                       Confirmar Escolha
                    </button>
                 </div>
               )}
             </div>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-arkanus-text-dim space-y-4 relative z-10">
               <div className="w-24 h-24 rounded-full border border-dashed border-stone-800 flex items-center justify-center opacity-50">
                 <Play className="w-8 h-8 text-stone-700" />
               </div>
               <p className="text-lg uppercase tracking-widest opacity-50">Selecione uma área de foco</p>
             </div>
           )}
           {activeMainAction && !currentAction && (
               <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none z-0">
                  <activeMainAction.icon className="w-full h-full text-arkanus-gold" />
               </div>
           )}
        </div>
      </div>
    </div>
  );
};
