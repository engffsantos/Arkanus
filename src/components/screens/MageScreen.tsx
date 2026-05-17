import React, { useState } from 'react';
import { useGameState } from '../../context/GameContext';
import { User, Zap, Brain, Book, Flame, Swords, History } from 'lucide-react';
import { calculateWritingQuality, calculateWritingProgress, calculateLabTotal } from '../../services/mageFormulas';

export const MageScreen: React.FC = () => {
    const { state, dispatch } = useGameState();
    const mage = state.mage;

    const [activeTab, setActiveTab] = useState<'resumo' | 'caracteristicas' | 'artes' | 'formulas' | 'historico'>('resumo');
    const [expandedFormula, setExpandedFormula] = useState<string | null>(null);

    if (!mage.characteristics || !mage.arts || !mage.abilities) {
        return <div className="p-8 text-stone-500">Dados do Mago corrompidos ou em versão antiga. Migre o save recarregando a página.</div>;
    }

    // Formulas
    const bestTechnique = Object.entries(mage.arts.techniques).sort((a, b) => (b[1] as number) - (a[1] as number))[0];
    const bestForm = Object.entries(mage.arts.forms).sort((a, b) => (b[1] as number) - (a[1] as number))[0];
    
    const maxLabTotal = calculateLabTotal({
        mage,
        technique: bestTechnique[0] as any,
        form: bestForm[0] as any,
        laboratoryQuality: state.laboratory.quality,
        auraBonus: state.covenant.auraArcana / 10,
        materialBonus: 0,
        assistantBonus: 0
    });

    const writeQuality = calculateWritingQuality({
        mage, scribeBonus: state.library.scribes, binderBonus: state.library.binders, illuminatorBonus: state.library.illuminators, resonanceBonus: 0
    });

    const writeProgress = calculateWritingProgress(mage);
    
    // Duel power
    const duelPower = (mage.arts.techniques[bestTechnique[0] as keyof typeof mage.arts.techniques] || 0) + (mage.arts.forms.mentem || 0);

    const toggleFormula = (id: string) => {
        setExpandedFormula(prev => prev === id ? null : id);
    };

    return (
        <div className="h-full flex flex-col gap-6">
            <div className="flex justify-between items-start">
               <div>
                  <h1 className="font-display text-3xl text-stone-200 tracking-wider flex items-center gap-3">
                     <User className="w-8 h-8 text-amber-500" /> Registro Arcano do Magus
                  </h1>
                  <p className="text-stone-400 mt-2">O núcleo intelectual, mágico e político da Soberania.</p>
               </div>
               
               <div className="bg-[#1a1511] border border-stone-800 rounded p-4 flex gap-6 text-sm text-stone-300">
                   <div>
                       <div className="text-xs text-stone-500 uppercase tracking-widest mb-1">Ano / Estação</div>
                       <div className="font-bold text-stone-200">{state.meta.year} — {state.meta.season}</div>
                   </div>
                   <div>
                       <div className="text-xs text-stone-500 uppercase tracking-widest mb-1">Ação Primária</div>
                       <div className={`font-bold ${state.meta.primaryAction ? 'text-amber-500' : 'text-stone-500'}`}>
                           {state.meta.primaryAction ? state.meta.primaryAction.category : 'Nenhuma definida'}
                       </div>
                   </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full min-h-0">
                {/* Lateral Esquerda */}
                <div className="col-span-12 md:col-span-3 flex flex-col gap-4">
                    <div className="bg-arkanus-panel border border-arkanus-border shadow-inner rounded p-6">
                        <div className="w-24 h-24 mx-auto bg-stone-900 border-2 border-stone-700 hover:border-amber-500/50 transition-colors uppercase rounded-full flex items-center justify-center text-3xl font-display text-stone-500 mb-4 cursor-help" title="Retrato do Magus">
                            {mage.name.charAt(0)}
                        </div>
                        <h2 className="text-center font-display text-xl text-stone-200 mb-1">{mage.name}</h2>
                        <div className="text-center text-sm text-stone-400 mb-6 border-b border-stone-800 pb-4">
                            Casa: {mage.tradition} • Idade: {mage.age}
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-stone-500">Distorção Arcana</span>
                                <span className="text-fuchsia-400 font-bold">{mage.warping}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-stone-500">Prestígio Arcano</span>
                                <span className="text-amber-400 font-bold">{mage.reputation?.arcane || 0}</span>
                            </div>
                            
                            <div className="pt-4 border-t border-stone-800">
                                <div className="text-xs uppercase text-stone-500 mb-2">Estado Físico</div>
                                <div className="capitalize font-bold text-stone-300">{mage.status?.physical}</div>
                            </div>
                            <div>
                                <div className="text-xs uppercase text-stone-500 mb-2">Estado Mental</div>
                                <div className="capitalize font-bold text-stone-300">{mage.status?.mental}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Centro e Direita */}
                <div className="col-span-12 md:col-span-9 flex flex-col gap-6 overflow-hidden">
                    <div className="flex gap-2 border-b border-arkanus-border pb-2 overflow-x-auto">
                        <button onClick={() => setActiveTab('resumo')} className={`px-4 py-2 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'resumo' ? 'border-amber-500 text-amber-400' : 'border-transparent text-stone-500 hover:text-stone-300'}`}><Zap className="w-4 h-4"/> Resumo</button>
                        <button onClick={() => setActiveTab('caracteristicas')} className={`px-4 py-2 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'caracteristicas' ? 'border-amber-500 text-amber-400' : 'border-transparent text-stone-500 hover:text-stone-300'}`}><Brain className="w-4 h-4"/> Características & Habilidades</button>
                        <button onClick={() => setActiveTab('artes')} className={`px-4 py-2 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'artes' ? 'border-amber-500 text-amber-400' : 'border-transparent text-stone-500 hover:text-stone-300'}`}><Flame className="w-4 h-4"/> Artes Arcanas</button>
                        <button onClick={() => setActiveTab('formulas')} className={`px-4 py-2 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'formulas' ? 'border-amber-500 text-amber-400' : 'border-transparent text-stone-500 hover:text-stone-300'}`}><Book className="w-4 h-4"/> Fórmulas</button>
                        <button onClick={() => setActiveTab('historico')} className={`px-4 py-2 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'historico' ? 'border-amber-500 text-amber-400' : 'border-transparent text-stone-500 hover:text-stone-300'}`}><History className="w-4 h-4"/> Histórico Crônico</button>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 pb-4">
                        {activeTab === 'resumo' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div className="bg-[#1a1511] p-5 rounded border border-stone-800">
                                        <div className="text-xs uppercase text-stone-500 mb-2">Melhor Total Laboratorial</div>
                                        <div className="font-display text-3xl text-amber-400 mb-1">{Math.floor(maxLabTotal)}</div>
                                        <div className="text-sm text-stone-400 capitalize">{bestTechnique[0]} + {bestForm[0]}</div>
                                    </div>
                                    <div className="bg-[#1a1511] p-5 rounded border border-stone-800">
                                        <div className="text-xs uppercase text-stone-500 mb-2">Qualidade de Escrita</div>
                                        <div className="font-display text-3xl text-stone-200 mb-1">{writeQuality}</div>
                                        <div className="text-sm text-stone-400">Qualidade Base ({mage.characteristics.communication > 0 ? `+${mage.characteristics.communication}` : mage.characteristics.communication} Com)</div>
                                    </div>
                                    <div className="bg-[#1a1511] p-5 rounded border border-stone-800">
                                        <div className="text-xs uppercase text-stone-500 mb-2">Produção Acadêmica</div>
                                        <div className="font-display text-3xl text-stone-200 mb-1">{writeProgress}</div>
                                        <div className="text-sm text-stone-400">Pontos por Estação (Latim {mage.abilities.latin})</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-stone-900 border border-stone-800 rounded p-4">
                                        <h3 className="font-display text-stone-300 mb-3 border-b border-stone-800 pb-2">Virtudes Notáveis</h3>
                                        {mage.virtues && mage.virtues.length > 0 ? (
                                            <ul className="space-y-2">
                                                {mage.virtues.map((v, i) => (
                                                    <li key={i} className="text-sm text-stone-400">
                                                        <span className="font-bold text-amber-500/80">{v.name}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : <p className="text-sm text-stone-500 italic">Nenhuma virtude excepcional mapeada.</p>}
                                    </div>
                                    <div className="bg-stone-900 border border-red-900/20 rounded p-4">
                                        <h3 className="font-display text-stone-300 mb-3 border-b border-stone-800 pb-2">Falhas & Limitações</h3>
                                        {mage.flaws && mage.flaws.length > 0 ? (
                                            <ul className="space-y-2">
                                                {mage.flaws.map((f, i) => (
                                                    <li key={i} className="text-sm text-stone-400">
                                                        <span className="font-bold text-red-400/80">{f.name}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : <p className="text-sm text-stone-500 italic">Nenhuma falha severa documentada.</p>}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'caracteristicas' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="font-display text-lg text-stone-300 mb-4 border-b border-stone-800 pb-2">Características Base</h3>
                                    <div className="space-y-3">
                                        {Object.entries(mage.characteristics).map(([key, val]) => (
                                            <div key={key} className="flex justify-between items-center bg-[#1a1511] p-2 px-3 rounded border border-stone-800">
                                                <span className="text-stone-400 capitalize">{key}</span>
                                                <span className={`font-bold ${(val as number) > 0 ? 'text-amber-400' : (val as number) < 0 ? 'text-red-400' : 'text-stone-500'}`}>
                                                    {(val as number) > 0 ? `+${val}` : val as number}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-display text-lg text-stone-300 mb-4 border-b border-stone-800 pb-2">Habilidades Específicas</h3>
                                    <div className="space-y-3">
                                        {Object.entries(mage.abilities).map(([key, val]) => (
                                            <div key={key} className="flex justify-between items-center bg-[#1a1511] p-2 px-3 rounded border border-stone-800">
                                                <span className="text-stone-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                                <span className="font-bold text-stone-200">{val}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-4 bg-stone-900 border border-stone-800 rounded">
                                        <p className="text-xs text-stone-500 mb-2">Ações Sazonais de Estudo e Treinamento em Breve.</p>
                                        <button disabled className="w-full py-2 bg-stone-800 text-stone-500 uppercase tracking-widest text-xs rounded border border-stone-700 cursor-not-allowed">
                                            Treinar Habilidade (Bloqueado)
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'artes' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="font-display text-lg text-stone-300 mb-4 border-b border-stone-800 pb-2">Técnicas (O Verbo)</h3>
                                    <div className="space-y-3">
                                        {Object.entries(mage.arts.techniques).map(([key, val]) => (
                                            <div key={key} className="flex justify-between items-center bg-[#1a1511] p-2 px-3 rounded border border-stone-800">
                                                <span className="text-stone-300 font-medium capitalize">{key}</span>
                                                <span className="font-bold text-fuchsia-400">{val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-display text-lg text-stone-300 mb-4 border-b border-stone-800 pb-2">Formas (O Alvo)</h3>
                                    <div className="space-y-3">
                                        {Object.entries(mage.arts.forms).map(([key, val]) => (
                                            <div key={key} className="flex justify-between items-center bg-[#1a1511] p-2 px-3 rounded border border-stone-800">
                                                <span className="text-stone-400 capitalize">{key}</span>
                                                <span className="font-bold text-amber-400">{val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'formulas' && (
                            <div className="space-y-4">
                                <div className="bg-[#1a1511] rounded border border-stone-800 overflow-hidden">
                                    <button onClick={() => toggleFormula('lab')} className="w-full p-4 flex justify-between items-center bg-stone-900/50 hover:bg-stone-900 text-left transition-colors">
                                        <div>
                                            <h3 className="font-display text-lg text-stone-200">Motor do Laboratório</h3>
                                            <p className="text-xs text-stone-500">Eficiência máxima estimada ({Math.floor(maxLabTotal)} pontos)</p>
                                        </div>
                                        <div className="text-stone-500">{expandedFormula === 'lab' ? '−' : '+'}</div>
                                    </button>
                                    
                                    {expandedFormula === 'lab' && (
                                        <div className="p-4 border-t border-stone-800 font-mono text-xs text-stone-300 space-y-2 bg-black/20">
                                            <div className="flex justify-between"><span className="text-stone-500">Inteligência:</span> <span>{mage.characteristics.intelligence > 0 ? `+${mage.characteristics.intelligence}` : mage.characteristics.intelligence}</span></div>
                                            <div className="flex justify-between"><span className="text-stone-500">Teoria Arcana:</span> <span>+{mage.abilities.magicTheory}</span></div>
                                            <div className="flex justify-between"><span className="text-stone-500">Melhor Técnica ({capitalize(bestTechnique[0])}):</span> <span className="text-fuchsia-400">+{bestTechnique[1]}</span></div>
                                            <div className="flex justify-between"><span className="text-stone-500">Melhor Forma ({capitalize(bestForm[0])}):</span> <span className="text-amber-400">+{bestForm[1]}</span></div>
                                            <div className="flex justify-between"><span className="text-stone-500">Oficina (Qualidade):</span> <span>+{state.laboratory.quality}</span></div>
                                            <div className="flex justify-between"><span className="text-stone-500">Aura Arcana:</span> <span>+{Math.floor(state.covenant.auraArcana/10)}</span></div>
                                            <div className="pt-2 border-t border-stone-800 font-bold flex justify-between text-amber-500 mt-2">
                                                <span>TOTAL COMBINAÇÃO IDEAL:</span>
                                                <span>{Math.floor(maxLabTotal)}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-[#1a1511] rounded border border-stone-800 overflow-hidden">
                                    <button onClick={() => toggleFormula('write')} className="w-full p-4 flex justify-between items-center bg-stone-900/50 hover:bg-stone-900 text-left transition-colors">
                                        <div>
                                            <h3 className="font-display text-lg text-stone-200">Qualidade de Escrita</h3>
                                            <p className="text-xs text-stone-500">Impacto em Tratados e Tomos ({writeQuality} pontos)</p>
                                        </div>
                                        <div className="text-stone-500">{expandedFormula === 'write' ? '−' : '+'}</div>
                                    </button>
                                    
                                    {expandedFormula === 'write' && (
                                        <div className="p-4 border-t border-stone-800 font-mono text-xs text-stone-300 space-y-2 bg-black/20">
                                            <div className="flex justify-between"><span className="text-stone-500">Comunicação:</span> <span>{mage.characteristics.communication > 0 ? `+${mage.characteristics.communication}` : mage.characteristics.communication}</span></div>
                                            <div className="flex justify-between"><span className="text-stone-500">Base Fixa Universal:</span> <span>+3</span></div>
                                            <div className="flex justify-between"><span className="text-stone-500">Bom Professor (Virtude):</span> <span>{mage.virtues.some((v: any) => v.id === 'good_teacher') ? '+3' : '+0'}</span></div>
                                            <div className="flex justify-between"><span className="text-stone-500">Escribas da Biblioteca:</span> <span>+{state.library.scribes}</span></div>
                                            <div className="flex justify-between"><span className="text-stone-500">Encadernadores:</span> <span>+{state.library.binders}</span></div>
                                            <div className="flex justify-between"><span className="text-stone-500">Iluminadores:</span> <span>+{state.library.illuminators}</span></div>
                                            <div className="pt-2 border-t border-stone-800 font-bold flex justify-between text-amber-500 mt-2">
                                                <span>QUALIDADE FINAL:</span>
                                                <span>{writeQuality}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-[#1a1511] rounded border border-stone-800 overflow-hidden">
                                    <button onClick={() => toggleFormula('duel')} className="w-full p-4 flex justify-between items-center bg-stone-900/50 hover:bg-stone-900 text-left transition-colors">
                                        <div>
                                            <h3 className="font-display text-lg text-stone-200">Potencial de Duelo</h3>
                                            <p className="text-xs text-stone-500">Poder arcano bruto em combate ({Math.floor(duelPower)} pontos)</p>
                                        </div>
                                        <div className="text-stone-500">{expandedFormula === 'duel' ? '−' : '+'}</div>
                                    </button>
                                    
                                    {expandedFormula === 'duel' && (
                                        <div className="p-4 border-t border-stone-800 font-mono text-xs text-stone-300 space-y-2 bg-black/20">
                                            <div className="flex justify-between"><span className="text-stone-500">Técnica Primária ({capitalize(bestTechnique[0])}):</span> <span className="text-fuchsia-400">+{bestTechnique[1]}</span></div>
                                            <div className="flex justify-between"><span className="text-stone-500">Forma de Combate (Mentem/Ignem/Corpus):</span> <span className="text-amber-400">+{mage.arts.forms.mentem || 0}</span></div>
                                            <div className="flex justify-between"><span className="text-stone-500">Penetração Adicional:</span> <span>+{mage.abilities.penetration || 0}</span></div>
                                            <div className="pt-2 border-t border-stone-800 font-bold flex justify-between text-red-500 mt-2">
                                                <span>PODER DE BASE:</span>
                                                <span>{Math.floor(duelPower)}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-[#1a1511] rounded border border-stone-800 overflow-hidden">
                                    <button onClick={() => toggleFormula('crisis')} className="w-full p-4 flex justify-between items-center bg-stone-900/50 hover:bg-stone-900 text-left transition-colors">
                                        <div>
                                            <h3 className="font-display text-lg text-stone-200">Intervenção em Crises</h3>
                                            <p className="text-xs text-stone-500">Capacidade de resposta a eventos</p>
                                        </div>
                                        <div className="text-stone-500">{expandedFormula === 'crisis' ? '−' : '+'}</div>
                                    </button>
                                    
                                    {expandedFormula === 'crisis' && (
                                        <div className="p-4 border-t border-stone-800 font-mono text-xs text-stone-300 space-y-3 bg-black/20">
                                            <div>
                                                <div className="flex justify-between text-amber-500 font-bold mb-1">
                                                    <span>Epidemias & Saúde Pública:</span>
                                                    <span>{(mage.arts.techniques.creo || 0) + (mage.arts.forms.corpus || 0) + (mage.abilities.medicine || 0)}</span>
                                                </div>
                                                <div className="text-[10px] text-stone-500 leading-tight">Usa Creo + Corpus + Medicina. Vital para conter mortes e preservar a força de trabalho.</div>
                                            </div>
                                            <div className="border-t border-stone-800/50 pt-2">
                                                <div className="flex justify-between text-amber-500 font-bold mb-1">
                                                    <span>Crises Agrícolas & Clima:</span>
                                                    <span>{Math.max((mage.arts.techniques.creo || 0) + (mage.arts.forms.herbam || 0), (mage.arts.techniques.rego || 0) + (mage.arts.forms.auram || 0))}</span>
                                                </div>
                                                <div className="text-[10px] text-stone-500 leading-tight">Usa Creo+Herbam (safras) ou Rego+Auram (clima). Essencial para evitar fome.</div>
                                            </div>
                                            <div className="border-t border-stone-800/50 pt-2">
                                                <div className="flex justify-between text-amber-500 font-bold mb-1">
                                                    <span>Controle de Corrupção (Auras):</span>
                                                    <span>{(mage.arts.techniques.rego || 0) + (mage.arts.forms.vim || 0)}</span>
                                                </div>
                                                <div className="text-[10px] text-stone-500 leading-tight">Usa Rego + Vim. Estabiliza auras e previne anomalias fatais no feudo.</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'historico' && (
                            <div className="bg-[#1a1511] p-6 rounded border border-stone-800">
                                <h3 className="font-display text-xl text-stone-200 mb-6">Crônica Sazonal do Magus</h3>
                                
                                {mage.history && mage.history.length > 0 ? (
                                    <div className="relative border-l border-stone-800 ml-3 space-y-6">
                                        {mage.history.map((entry, idx) => (
                                            <div key={idx} className="relative pl-6">
                                                <div className="absolute w-3 h-3 bg-stone-800 rounded-full -left-[6.5px] top-1.5 border-2 border-stone-900" />
                                                <div className="text-xs text-amber-500 mb-1 font-bold">Ano {entry.year}, {entry.season}</div>
                                                <div className="text-sm text-stone-300 bg-stone-900 border border-stone-800 p-3 rounded">
                                                    {entry.description}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-10 text-stone-500">
                                        Nenhuma entrada crônica registrada ainda. Ações importantes gerarão memórias aqui.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

function capitalize(str: string) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}
