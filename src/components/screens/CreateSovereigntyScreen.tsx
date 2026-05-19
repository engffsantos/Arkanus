import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '../../context/GameContext';
import { ArrowLeft, ArrowRight, Sparkles, Check, User, Scroll, Star, FlaskConical, BookOpen, Swords } from 'lucide-react';
import {
  MAGE_ORIGINS, MAGE_TRADITIONS, MAGE_SPECIALIZATIONS,
  MAGE_VIRTUES, MAGE_FLAWS, INITIAL_LABORATORIES, MAGE_AMBITIONS,
  MageCreationConfig, MageOriginId, MageTraditionId, MageSpecializationId,
  InitialLaboratoryId, MageAmbitionId, MageVirtueId, MageFlawId
} from '../../data/mageCreation';
import { TechniqueKey, FormKey } from '../../types/game';

const TECHNIQUES: { key: TechniqueKey; label: string }[] = [
  { key: 'creo', label: 'Criar' }, { key: 'intellego', label: 'Perceber' },
  { key: 'muto', label: 'Transformar' }, { key: 'rego', label: 'Controlar' }, { key: 'perdo', label: 'Destruir' }
];
const FORMS: { key: FormKey; label: string }[] = [
  { key: 'corpus', label: 'Corpo' }, { key: 'mentem', label: 'Mente' }, { key: 'ignem', label: 'Fogo' },
  { key: 'terram', label: 'Terra' }, { key: 'aquam', label: 'Água' }, { key: 'auram', label: 'Ar' },
  { key: 'herbam', label: 'Planta' }, { key: 'animal', label: 'Animal' }, { key: 'imaginem', label: 'Imagem' }, { key: 'vim', label: 'Espírito' }
];

const ATTR_KEYS = ['intelligence','communication','perception','presence','strength','stamina','dexterity','quickness'] as const;
const ATTR_LABELS: Record<string, string> = {
  intelligence: 'Inteligência', communication: 'Comunicação', perception: 'Percepção',
  presence: 'Presença', strength: 'Força', stamina: 'Vigor', dexterity: 'Destreza', quickness: 'Agilidade'
};

type Step = 'identity' | 'origin' | 'tradition' | 'attributes' | 'arts' | 'specialization' | 'virtues' | 'laboratory' | 'ambition' | 'confirm';
const STEPS: Step[] = ['identity','origin','tradition','attributes','arts','specialization','virtues','laboratory','ambition','confirm'];
const STEP_LABELS: Record<Step, string> = {
  identity: 'Identidade', origin: 'Origem', tradition: 'Tradição', attributes: 'Atributos',
  arts: 'Artes', specialization: 'Especialização', virtues: 'Virtudes', laboratory: 'Laboratório',
  ambition: 'Ambição', confirm: 'Confirmação'
};

const inputCls = 'w-full bg-[#0a0806] border border-arkanus-border rounded px-4 py-2 text-arkanus-text focus:outline-none focus:border-amber-500/50 transition-colors';
const labelCls = 'text-xs uppercase tracking-[0.18em] text-arkanus-gold-light block mb-1';
const cardCls = (sel: boolean) => `flex flex-col p-4 border rounded text-left cursor-pointer transition-all ${sel ? 'bg-amber-950/30 border-amber-500/60' : 'bg-[#0a0806] border-arkanus-border hover:border-amber-900/50'}`;

function ChoiceGrid<T extends string>({ items, selected, onSelect, multi, max }: {
  items: { id: T; name: string; description: string; bonuses: any[]; penalties: any[] }[];
  selected: T | T[]; onSelect: (id: T) => void; multi?: boolean; max?: number;
}) {
  const isSelected = (id: T) => Array.isArray(selected) ? selected.includes(id) : selected === id;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[55vh] overflow-y-auto pr-1">
      {items.map(item => (
        <button key={item.id} type="button" onClick={() => onSelect(item.id)}
          className={cardCls(isSelected(item.id))}
          disabled={multi && Array.isArray(selected) && selected.length >= (max ?? 99) && !isSelected(item.id)}>
          <span className={`font-display text-base mb-1 ${isSelected(item.id) ? 'text-amber-300' : 'text-arkanus-text'}`}>{item.name}</span>
          <span className="text-xs text-arkanus-text-dim mb-2">{item.description}</span>
          {item.bonuses.length > 0 && <div className="text-xs text-green-400">{item.bonuses.map(b => b.label).join(' · ')}</div>}
          {item.penalties.length > 0 && <div className="text-xs text-red-400">{item.penalties.map(p => p.label).join(' · ')}</div>}
        </button>
      ))}
    </div>
  );
}

export const CreateSovereigntyScreen: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useGameState();
  const [step, setStep] = useState<Step>('identity');

  const [covenantName, setCovenantName] = useState('');
  const [archetype, setArchetype] = useState<'Laboratory'|'Commerce'|'Rural'|'Arcane'|'Sacred'|'Political'>('Laboratory');
  const [difficulty, setDifficulty] = useState<'Easy'|'Normal'|'Hard'>('Normal');

  const [mageName, setMageName] = useState('');
  const [title, setTitle] = useState('');
  const [age, setAge] = useState(35);
  const [originRegion, setOriginRegion] = useState('Reno');
  const [personalSymbol, setPersonalSymbol] = useState('');

  const [origin, setOrigin] = useState<MageOriginId>('urban_academic');
  const [tradition, setTradition] = useState<MageTraditionId>('green_tower');
  const [specialization, setSpecialization] = useState<MageSpecializationId>('laboratory_researcher');
  const [initialLaboratory, setInitialLaboratory] = useState<InitialLaboratoryId>('ancient_tower');
  const [ambition, setAmbition] = useState<MageAmbitionId>('found_great_library');
  const [virtues, setVirtues] = useState<MageVirtueId[]>([]);
  const [flaw, setFlaw] = useState<MageFlawId | ''>('');

  const [attrs, setAttrs] = useState({ intelligence:0, communication:0, perception:0, presence:0, strength:0, stamina:0, dexterity:0, quickness:0 });
  const attrTotal = Object.values(attrs).reduce((s, v) => s + Math.max(0, v), 0) - Object.values(attrs).filter(v => v < 0).length;
  const attrPoints = 10 - attrTotal + Object.values(attrs).filter(v => v < 0).length;

  const [primaryTechnique, setPrimaryTechnique] = useState<string>('creo');
  const [primaryForm, setPrimaryForm] = useState<string>('corpus');
  const [secondaryArts, setSecondaryArts] = useState<string[]>([]);
  const [minorArts, setMinorArts] = useState<string[]>([]);

  const toggleVirtue = (id: MageVirtueId) => {
    setVirtues(v => v.includes(id) ? v.filter(x => x !== id) : v.length < 2 ? [...v, id] : v);
  };

  const toggleSecondary = (key: string) => {
    setSecondaryArts(s => s.includes(key) ? s.filter(x => x !== key) : s.length < 2 ? [...s, key] : s);
  };
  const toggleMinor = (key: string) => {
    setMinorArts(s => s.includes(key) ? s.filter(x => x !== key) : s.length < 3 ? [...s, key] : s);
  };

  const artLabel = (key: string) => {
    return TECHNIQUES.find(t => t.key === key)?.label ?? FORMS.find(f => f.key === key)?.label ?? key;
  };

  const stepIdx = STEPS.indexOf(step);
  const prev = () => setStep(STEPS[stepIdx - 1]);
  const next = () => setStep(STEPS[stepIdx + 1]);

  const canNext = (): boolean => {
    switch (step) {
      case 'identity': return mageName.trim().length >= 2 && covenantName.trim().length >= 2 && age >= 25 && age <= 80;
      case 'origin': return !!origin;
      case 'tradition': return !!tradition;
      case 'attributes': return attrPoints === 0;
      case 'arts': return !!primaryTechnique && !!primaryForm && secondaryArts.length === 2 && minorArts.length === 3;
      case 'specialization': return !!specialization;
      case 'virtues': return virtues.length === 2 && !!flaw;
      case 'laboratory': return !!initialLaboratory;
      case 'ambition': return !!ambition;
      case 'confirm': return true;
      default: return true;
    }
  };

  const handleCreate = () => {
    const mageConfig: MageCreationConfig = {
      mageName, title, age, originRegion, personalSymbol,
      appearance: { portrait: 'middle_male', vestment: 'robes_dark', symbol: personalSymbol },
      origin, tradition, specialization, initialLaboratory, ambition,
      virtues: virtues as [MageVirtueId, MageVirtueId],
      flaw: flaw as MageFlawId,
      characteristics: attrs,
      arts: { primaryTechnique, primaryForm, secondaryArts, minorArts }
    };
    dispatch({ type: 'CREATE_CAMPAIGN', payload: { covenantName, archetype, difficulty, gameMode: 'Standard', mage: mageConfig } });
    navigate('/game/dashboard');
  };

  const renderStep = () => {
    switch (step) {
      case 'identity':
        return (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelCls}>Nome do Mago *</label>
                <input className={inputCls} value={mageName} onChange={e => setMageName(e.target.value)} placeholder="Ex: Severian" /></div>
              <div><label className={labelCls}>Título</label>
                <input className={inputCls} value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: o Sábio" /></div>
              <div><label className={labelCls}>Nome da Soberania *</label>
                <input className={inputCls} value={covenantName} onChange={e => setCovenantName(e.target.value)} placeholder="Ex: Arkanus" /></div>
              <div><label className={labelCls}>Idade Inicial ({age})</label>
                <input type="range" min={25} max={80} value={age} onChange={e => setAge(Number(e.target.value))} className="w-full" /></div>
              <div><label className={labelCls}>Região de Origem</label>
                <input className={inputCls} value={originRegion} onChange={e => setOriginRegion(e.target.value)} placeholder="Ex: Reno" /></div>
              <div><label className={labelCls}>Símbolo Pessoal</label>
                <input className={inputCls} value={personalSymbol} onChange={e => setPersonalSymbol(e.target.value)} placeholder="Ex: Serpente Ouroboros" /></div>
            </div>
            <div className="border-t border-arkanus-border pt-4">
              <label className={labelCls}>Arquétipo de Soberania</label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                {(['Laboratory','Commerce','Rural','Arcane','Sacred','Political'] as const).map(a => (
                  <button key={a} type="button" onClick={() => setArchetype(a)} className={cardCls(archetype === a)}>
                    <span className={`text-sm font-medium ${archetype === a ? 'text-amber-300' : ''}`}>{a}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={labelCls}>Dificuldade</label>
                <select className={inputCls} value={difficulty} onChange={e => setDifficulty(e.target.value as any)}>
                  <option value="Easy">Fácil</option><option value="Normal">Normal</option><option value="Hard">Difícil</option>
                </select></div>
            </div>
          </div>
        );
      case 'origin':
        return <ChoiceGrid items={MAGE_ORIGINS} selected={origin} onSelect={id => setOrigin(id)} />;
      case 'tradition':
        return <ChoiceGrid items={MAGE_TRADITIONS} selected={tradition} onSelect={id => setTradition(id)} />;
      case 'attributes':
        return (
          <div className="space-y-3">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-arkanus-text-dim">Distribua exatamente <strong className="text-arkanus-gold">10</strong> pontos (−1 a +3 por atributo)</span>
              <span className={`font-bold ${attrPoints === 0 ? 'text-green-400' : attrPoints < 0 ? 'text-red-400' : 'text-amber-400'}`}>Restantes: {attrPoints}</span>
            </div>
            {ATTR_KEYS.map(k => (
              <div key={k} className="flex items-center gap-4">
                <span className="w-36 text-sm text-arkanus-text">{ATTR_LABELS[k]}</span>
                <button type="button" onClick={() => setAttrs(a => ({ ...a, [k]: Math.max(-1, a[k] - 1) }))}
                  className="w-8 h-8 border border-arkanus-border rounded hover:border-amber-500 text-lg">−</button>
                <span className={`w-8 text-center font-bold text-lg ${attrs[k] > 0 ? 'text-green-400' : attrs[k] < 0 ? 'text-red-400' : 'text-arkanus-text-dim'}`}>{attrs[k] > 0 ? `+${attrs[k]}` : attrs[k]}</span>
                <button type="button" onClick={() => setAttrs(a => ({ ...a, [k]: Math.min(3, a[k] + 1) }))}
                  disabled={attrPoints <= 0 && attrs[k] >= 0}
                  className="w-8 h-8 border border-arkanus-border rounded hover:border-amber-500 text-lg disabled:opacity-30">+</button>
              </div>
            ))}
          </div>
        );
      case 'arts':
        return (
          <div className="space-y-5 max-h-[55vh] overflow-y-auto pr-1">
            <div>
              <label className={labelCls}>Técnica Principal (valor 5)</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {TECHNIQUES.map(t => (
                  <button key={t.key} type="button" onClick={() => setPrimaryTechnique(t.key)}
                    className={`px-3 py-1.5 border rounded text-sm transition-colors ${primaryTechnique === t.key ? 'border-amber-500 bg-amber-950/40 text-amber-300' : 'border-arkanus-border hover:border-amber-900/50'}`}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelCls}>Forma Principal (valor 5)</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {FORMS.map(f => (
                  <button key={f.key} type="button" onClick={() => setPrimaryForm(f.key)}
                    className={`px-3 py-1.5 border rounded text-sm transition-colors ${primaryForm === f.key ? 'border-amber-500 bg-amber-950/40 text-amber-300' : 'border-arkanus-border hover:border-amber-900/50'}`}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelCls}>Artes Secundárias — 2 de 3 (valor 3)</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {[...TECHNIQUES, ...FORMS].filter(a => a.key !== primaryTechnique && a.key !== primaryForm).map(a => (
                  <button key={a.key} type="button" onClick={() => toggleSecondary(a.key)}
                    disabled={secondaryArts.length >= 2 && !secondaryArts.includes(a.key)}
                    className={`px-3 py-1.5 border rounded text-sm transition-colors disabled:opacity-30 ${secondaryArts.includes(a.key) ? 'border-blue-500 bg-blue-950/30 text-blue-300' : 'border-arkanus-border hover:border-blue-900/50'}`}>
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelCls}>Artes Menores — 3 de 1 (valor 1)</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {[...TECHNIQUES, ...FORMS].filter(a => a.key !== primaryTechnique && a.key !== primaryForm && !secondaryArts.includes(a.key)).map(a => (
                  <button key={a.key} type="button" onClick={() => toggleMinor(a.key)}
                    disabled={minorArts.length >= 3 && !minorArts.includes(a.key)}
                    className={`px-3 py-1.5 border rounded text-sm transition-colors disabled:opacity-30 ${minorArts.includes(a.key) ? 'border-purple-500 bg-purple-950/30 text-purple-300' : 'border-arkanus-border hover:border-purple-900/50'}`}>
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 'specialization':
        return <ChoiceGrid items={MAGE_SPECIALIZATIONS} selected={specialization} onSelect={id => setSpecialization(id)} />;
      case 'virtues':
        return (
          <div className="space-y-5">
            <div>
              <label className={labelCls}>Virtudes — escolha exatamente 2 ({virtues.length}/2)</label>
              <ChoiceGrid items={MAGE_VIRTUES} selected={virtues} onSelect={toggleVirtue} multi max={2} />
            </div>
            <div>
              <label className={labelCls}>Defeito — escolha exatamente 1</label>
              <ChoiceGrid items={MAGE_FLAWS} selected={flaw as MageFlawId} onSelect={id => setFlaw(id)} />
            </div>
          </div>
        );
      case 'laboratory':
        return <ChoiceGrid items={INITIAL_LABORATORIES} selected={initialLaboratory} onSelect={id => setInitialLaboratory(id)} />;
      case 'ambition':
        return <ChoiceGrid items={MAGE_AMBITIONS} selected={ambition} onSelect={id => setAmbition(id)} />;
      case 'confirm': {
        const originData = MAGE_ORIGINS.find(o => o.id === origin);
        const traditionData = MAGE_TRADITIONS.find(t => t.id === tradition);
        const specData = MAGE_SPECIALIZATIONS.find(s => s.id === specialization);
        const labData = INITIAL_LABORATORIES.find(l => l.id === initialLaboratory);
        const ambData = MAGE_AMBITIONS.find(a => a.id === ambition);
        const virtueNames = virtues.map(v => MAGE_VIRTUES.find(x => x.id === v)?.name).join(', ');
        const flawName = MAGE_FLAWS.find(f => f.id === flaw)?.name;
        return (
          <div className="space-y-4 text-sm max-h-[55vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#0a0806] border border-arkanus-border rounded p-3">
                <div className="text-arkanus-text-dim text-xs uppercase tracking-widest mb-1">Mago</div>
                <div className="text-arkanus-gold-light font-display text-lg">{mageName}{title ? `, ${title}` : ''}</div>
                <div className="text-arkanus-text-dim text-xs">Idade {age} · {originRegion}</div>
              </div>
              <div className="bg-[#0a0806] border border-arkanus-border rounded p-3">
                <div className="text-arkanus-text-dim text-xs uppercase tracking-widest mb-1">Soberania</div>
                <div className="text-arkanus-gold-light font-display text-lg">{covenantName}</div>
                <div className="text-arkanus-text-dim text-xs">{archetype} · {difficulty}</div>
              </div>
            </div>
            {[
              ['Origem', originData?.name], ['Tradição', traditionData?.name],
              ['Especialização', specData?.name], ['Laboratório', labData?.name], ['Ambição', ambData?.name],
              ['Virtudes', virtueNames], ['Defeito', flawName],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-2 border-b border-arkanus-border/30 pb-2">
                <span className="text-arkanus-text-dim w-28 shrink-0">{k}</span>
                <span className="text-arkanus-text">{v}</span>
              </div>
            ))}
            <div className="border-b border-arkanus-border/30 pb-2">
              <span className="text-arkanus-text-dim block mb-1">Artes</span>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-0.5 bg-amber-950/40 border border-amber-500/40 rounded text-xs text-amber-300">{artLabel(primaryTechnique)} 5</span>
                <span className="px-2 py-0.5 bg-amber-950/40 border border-amber-500/40 rounded text-xs text-amber-300">{artLabel(primaryForm)} 5</span>
                {secondaryArts.map(a => <span key={a} className="px-2 py-0.5 bg-blue-950/30 border border-blue-500/40 rounded text-xs text-blue-300">{artLabel(a)} 3</span>)}
                {minorArts.map(a => <span key={a} className="px-2 py-0.5 bg-purple-950/30 border border-purple-500/40 rounded text-xs text-purple-300">{artLabel(a)} 1</span>)}
              </div>
            </div>
            <div>
              <span className="text-arkanus-text-dim block mb-1">Atributos</span>
              <div className="flex flex-wrap gap-2">
                {ATTR_KEYS.map(k => attrs[k] !== 0 && (
                  <span key={k} className={`text-xs px-2 py-0.5 rounded border ${attrs[k] > 0 ? 'border-green-700 text-green-400' : 'border-red-700 text-red-400'}`}>
                    {ATTR_LABELS[k]} {attrs[k] > 0 ? `+${attrs[k]}` : attrs[k]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-arkanus-bg text-arkanus-text relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1410] via-[#050403] to-[#020101] z-0" />
      <div className="relative z-10 flex flex-col h-full max-w-3xl mx-auto w-full px-4 py-6">

        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-arkanus-text-dim hover:text-arkanus-gold mb-4 transition-colors uppercase tracking-widest text-xs">
          <ArrowLeft className="w-4 h-4" /> Voltar ao Portal
        </button>

        <div className="text-center mb-5">
          <h1 className="font-display text-3xl text-arkanus-gold-light tracking-widest">Nova Soberania</h1>
          <p className="text-arkanus-text-dim mt-1 font-serif italic text-sm">Defina o mago que fundará seu domínio arcano.</p>
        </div>

        {/* Step indicator */}
        <div className="flex gap-1 mb-6 overflow-x-auto">
          {STEPS.map((s, i) => (
            <div key={s} className={`flex-1 min-w-0 text-center py-1 border-b-2 text-xs transition-colors ${s === step ? 'border-amber-500 text-amber-400' : i < stepIdx ? 'border-green-700 text-green-600' : 'border-arkanus-border text-arkanus-text-dim'}`}>
              <span className="truncate block">{STEP_LABELS[s]}</span>
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="flex-1 overflow-hidden">
          <div className="bg-arkanus-panel border border-arkanus-border rounded shadow-2xl p-6 h-full flex flex-col">
            <h2 className="font-display text-xl text-arkanus-gold mb-4">{STEP_LABELS[step]}</h2>
            <div className="flex-1 overflow-auto">
              {renderStep()}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-4">
          <button onClick={prev} disabled={stepIdx === 0}
            className="flex items-center gap-2 px-4 py-2 border border-arkanus-border rounded hover:border-amber-500/50 disabled:opacity-30 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Anterior
          </button>
          {!canNext() && step !== 'confirm' && (
            <span className="text-xs text-red-400">Complete esta etapa para avançar</span>
          )}
          {step === 'confirm' ? (
            <button onClick={handleCreate}
              className="flex items-center gap-2 px-6 py-2 bg-arkanus-gold text-stone-900 font-medium uppercase tracking-wider text-sm rounded shadow-[0_0_15px_rgba(202,138,4,0.3)] hover:bg-amber-300 transition-all">
              <Sparkles className="w-4 h-4" /> Fundar Soberania
            </button>
          ) : (
            <button onClick={next} disabled={!canNext()}
              className="flex items-center gap-2 px-4 py-2 bg-amber-900/40 border border-amber-700/50 hover:border-amber-500 text-amber-300 rounded disabled:opacity-30 transition-colors text-sm">
              Próximo <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
