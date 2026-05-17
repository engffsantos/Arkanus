import React, { useState, useEffect } from 'react';
import { BookOpen, Map, Zap, FlaskConical, Scale, Swords, Shield, HeartPulse, Search, Info, ExternalLink, Sparkles } from 'lucide-react';

interface CodexEntry {
    id: string;
    tab: string;
    title: string;
    text: string;
    related: string[];
    isNew?: boolean;
}

export const CodexScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState('intro');
    const [searchTerm, setSearchTerm] = useState('');
    
    // Unread tracking via localStorage
    const [readEntries, setReadEntries] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem('arkanus_read_codex');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const tabs = [
        { id: 'intro', label: 'Introdução & Regras Gerais', icon: Info },
        { id: 'glossary', label: 'Termos & Glossário', icon: BookOpen },
        { id: 'lab_books', label: 'Laboratório & Biblioteca', icon: FlaskConical },
        { id: 'gov_map', label: 'Governança & Território', icon: Castle },
        { id: 'economy', label: 'Comércio & Guildas', icon: Scale },
        { id: 'diplomacy', label: 'Diplomacia & Conflitos', icon: Swords },
    ];

    const contentData: CodexEntry[] = [
        {
            id: 'como_jogar',
            tab: 'intro',
            title: "Como Jogar Arkanus",
            text: "Arkanus é um jogo de soberania arcana por turnos sazonais. Você governa território, recursos, população, magia, saúde, economia e relações políticas. \n\n1. Verifique a estação atual.\n2. Escolha uma Ação Primária.\n3. Confirme os custos.\n4. Avance a estação no botão lateral.\n5. Enfrente Eventos.\n6. Feche o ano no final do Inverno.",
            related: ['acao_primaria', 'estacoes']
        },
        {
            id: 'estacoes',
            tab: 'intro',
            title: "As Estações (Turnos)",
            text: "O jogo avança estação por estação: Primavera, Verão, Outono e Inverno.\n- Primavera: Recuperação, crescimento, saúde.\n- Verão: viagens e comércio.\n- Outono: colheita, preparação.\n- Inverno: Estudo, laboratório, planejamento recluso. Finaliza os Relatórios Anuais.",
            related: ['humores', 'economia']
        },
        {
            id: 'acao_primaria',
            tab: 'intro',
            title: "Ação Primária",
            text: "Consome 1 turno completo. Ações Informativas (ajustes pontuais) não consomem estação, mas Ações Fortes (Construções Arcanas, Viagens, Tribunais), sim. Ao avançar a Estação, os resultados do semestre processam dependendo da sua Ação Primária.",
            related: ['como_jogar']
        },
        {
            id: 'soberania',
            tab: 'glossary',
            title: "Soberania",
            text: "Domínio arcano administrado pelo jogador. Sua base de poder mágico, político e territorial.",
            related: ['governanca', 'forais']
        },
        {
            id: 'tribunal',
            tab: 'glossary',
            title: "Tribunal Hermético",
            text: "A congregação jurídica magística que se reúne a cada 7 anos (ou em emergências) para decidir disputas de fronteira, crime mágico e quebras políticas.",
            related: ['diplomacia'],
            isNew: true
        },
        {
            id: 'essencia',
            tab: 'glossary',
            title: "Essência (Vis)",
            text: "A manifestação física da magia bruta, extraída de Locais no Mapa ou Forais. Gasta na finalização de itens, mitigação de tensões profundas e magias de alto tier.",
            related: ['laboratorio', 'forais']
        },
        {
            id: 'humores',
            tab: 'glossary',
            title: "Lealdade & Humores",
            text: "Lealdade baixa aumenta risco de revolta e fuga de servos. A saúde da população segue os Quatro Humores Sazonais (Sangue na Primavera, Cólera no Verão, Melancolia no Outono, Fleuma no Inverno).",
            related: ['governanca']
        },
        {
            id: 'laboratorio',
            tab: 'lab_books',
            title: "Laboratório",
            text: "Total de Laboratório = Inteligência do Mago + Teoria da Tradição Arcana + Modificadores da Aura aplicável + Bônus Assistentes. Projetos muito ambiciosos exigem a injeção extra de Essências para garantir estabilidade.",
            related: ['essencia', 'biblioteca']
        },
        {
            id: 'biblioteca',
            tab: 'lab_books',
            title: "Biblioteca e Escrita",
            text: "Ao ler ou escrever um Trato Menor ou Tomo Maior, a Qualidade do livro deriva diretamente da sua capacidade de Comunicação (Comm + Idiomas) combinada a atributos das Guildas (como Escribas e Iluminadores).",
            related: ['laboratorio'],
            isNew: true
        },
        {
            id: 'governanca',
            tab: 'gov_map',
            title: "Ajustando Governança",
            text: "- Ajustar Impostos gera Prata (lucro), mas sangra a Lealdade do seu povo.\n- Distribuir Alimentos consome Prata, mas eleva drasticamente a Lealdade pacifica revoltas.",
            related: ['humores']
        },
        {
            id: 'forais',
            tab: 'gov_map',
            title: "Forais e Auras Magísticas",
            text: "O Foral é a fundação jurídica perante a Nobreza ou Igreja e estabiliza imunidades. Auras competem: Aura Sacra bloqueia magia mundana; Aura Arcana bonifica laboratório. Extrair a Essência Mística bruta permanentemente destrói o vínculo Arcânico.",
            related: ['essencia', 'soberania']
        },
        {
            id: 'economia',
            tab: 'economy',
            title: "As Caravanas",
            text: "Caravanas de prata enviam as produções geradas pelas Guildas e viajam durante os turnos. Lucro final depende de Valor das Mercadorias + Bônus de Feira - Custo com Escolta - Custos de Rota por risco.",
            related: ['estacoes']
        },
        {
            id: 'diplomacia',
            tab: 'diplomacia',
            title: "Facções Regionais",
            text: "Você lida com a Nobreza Local, Igreja (Sagrada), Mercadores e outros Magos Rivais. A Pressão aumenta com ações mágicas descaradas. Ofertar Prata reduz o Medo. Se Conflitos passarem da data limite, serão cobrados em Tribunal.",
            related: ['tribunal']
        }
    ];

    // Mark items as read when viewed
    useEffect(() => {
        const unreadInView = contentData
            .filter(c => (searchTerm ? c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.text.toLowerCase().includes(searchTerm.toLowerCase()) : c.tab === activeTab))
            .filter(c => !readEntries.includes(c.id))
            .map(c => c.id);

        if (unreadInView.length > 0) {
            const newRead = [...readEntries, ...unreadInView];
            setReadEntries(newRead);
            localStorage.setItem('arkanus_read_codex', JSON.stringify(newRead));
        }
    }, [activeTab, searchTerm, contentData, readEntries]);

    const filteredContent = contentData.filter(c => {
        if (searchTerm) {
            return c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.text.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return c.tab === activeTab;
    });

    const handleInternalLink = (targetId: string) => {
        const targetEntry = contentData.find(c => c.id === targetId);
        if (targetEntry) {
            setSearchTerm(''); // Clear search
            setActiveTab(targetEntry.tab); // Navigate to tab
            
            // Scroll to element after a brief delay to allow render
            setTimeout(() => {
                const element = document.getElementById(`codex-${targetId}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Highlight effect
                    element.classList.add('ring-2', 'ring-amber-500', 'transition-all');
                    setTimeout(() => element.classList.remove('ring-2', 'ring-amber-500'), 2000);
                }
            }, 100);
        }
    };

    return (
        <div className="h-full flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                    <h1 className="font-display text-3xl text-stone-200 tracking-wider flex items-center gap-3">
                        Codex Hermeticus
                        {contentData.some(c => c.isNew && !readEntries.includes(c.id)) && (
                            <span className="text-xs bg-amber-900/50 text-amber-400 px-2 py-1 rounded border border-amber-500/50 flex items-center gap-1 animate-pulse">
                                <Sparkles className="w-3 h-3" /> Atualizado
                            </span>
                        )}
                    </h1>
                    <p className="text-stone-400 mt-2">Os preceitos milenares das Soberanias Arcanas, compilados pelos Bonisagi.</p>
                </div>
                <div className="relative shrink-0 w-full md:w-64">
                    <Search className="w-5 h-5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                        type="text"
                        placeholder="Buscar no Codex..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="bg-[#0a0806] border border-stone-800 text-stone-200 rounded-lg pl-10 pr-4 py-2 outline-none focus:border-stone-500 transition-colors w-full"
                    />
                </div>
            </div>

            {!searchTerm && (
                <div className="flex gap-2 border-b border-arkanus-border pb-2 overflow-x-auto custom-scrollbar">
                    {tabs.map(tab => {
                        const hasUnread = contentData.some(c => c.tab === tab.id && !readEntries.includes(c.id));
                        
                        return (
                            <button 
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative flex items-center gap-2 px-3 py-2 rounded-t whitespace-nowrap transition-colors ${activeTab === tab.id ? 'bg-[#1a1511] text-amber-500 border-t border-l border-r border-stone-800' : 'text-stone-500 hover:text-stone-300'}`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                                {hasUnread && (
                                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500" />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}

            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar space-y-8 bg-[#0a0806]/50 rounded p-6 border border-stone-900">
                {searchTerm && (
                    <div className="text-sm font-medium text-amber-600 mb-4 tracking-widest uppercase">
                        Resultados encontrados ({filteredContent.length})
                    </div>
                )}
                
                {filteredContent.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {filteredContent.map((item) => (
                            <section 
                                key={item.id} 
                                id={`codex-${item.id}`}
                                className="animate-fade-in-up bg-[#1a1511] p-6 rounded border border-stone-800 flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start mb-3 border-b border-stone-800 pb-2">
                                    <h2 className="text-xl font-display text-stone-200 flex items-center gap-2">
                                        {item.title}
                                        {item.isNew && <span className="text-[10px] bg-amber-900/30 text-amber-500 px-1.5 py-0.5 rounded uppercase tracking-wider">Novo</span>}
                                    </h2>
                                </div>
                                <p className="text-stone-400 whitespace-pre-wrap leading-relaxed space-y-2 flex-grow">{item.text}</p>
                                
                                {item.related && item.related.length > 0 && (
                                    <div className="mt-6 pt-4 border-t border-stone-800/50">
                                        <h3 className="text-xs text-stone-500 uppercase tracking-widest mb-3">Tópicos Relacionados</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {item.related.map(relId => {
                                                const relEntry = contentData.find(c => c.id === relId);
                                                if (!relEntry) return null;
                                                return (
                                                    <button 
                                                        key={relId}
                                                        onClick={() => handleInternalLink(relId)}
                                                        className="text-xs px-2 py-1 bg-stone-900 text-stone-400 hover:text-amber-400 hover:bg-stone-800 border border-stone-800 hover:border-amber-900/50 rounded flex items-center gap-1 transition-all"
                                                    >
                                                        <ExternalLink className="w-3 h-3" />
                                                        {relEntry.title}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}
                            </section>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-stone-500">
                        <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Nenhum registro encontrado nas relíquias Bonisagi para "{searchTerm}".</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Polyfill internal icon for usage
const Castle = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 20v-6h-2v6h-4v-4h-4v4H8v-4H4v4H2v-6h2V8h2L4 4h4v4h4V4h4v4h4L18 4h4v16z"/></svg>
);

