import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '../../context/GameContext';
import { ArrowLeft, Compass, Shield, Sparkles } from 'lucide-react';

export const CreateSovereigntyScreen: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useGameState();
  
  const [formData, setFormData] = useState<any>({
    covenantName: '',
    mageName: '',
    tradition: 'Mercúrio',
    archetype: 'Laboratory',
    region: 'Rhine',
    difficulty: 'Normal',
    gameMode: 'Standard'
  });

  const archetypes = [
    { id: 'Laboratory', name: 'Aliança Laboratorial', desc: '+2 Pesquisa, -Prata inicial' },
    { id: 'Commerce', name: 'Feudo Comercial', desc: '+Prata inicial, +Guildas' },
    { id: 'Rural', name: 'Domínio Rural', desc: '+População, +Saúde' },
    { id: 'Arcane', name: 'Enclave Arcano', desc: '+Aura Arcana, +Essência' },
    { id: 'Sacred', name: 'Vila Sacra', desc: '+Aura Sacra, +Saúde, -Aura Arcana' },
    { id: 'Political', name: 'Domínio Político', desc: '+Influência, +Relações Nobres' },
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.covenantName || !formData.mageName) return;

    dispatch({
      type: 'CREATE_CAMPAIGN',
      payload: formData
    });

    navigate('/game/dashboard');
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-arkanus-bg text-arkanus-text relative justify-center items-center">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1410] via-[#050403] to-[#020101] z-0"></div>

      <div className="relative z-10 w-full max-w-2xl bg-arkanus-panel border border-arkanus-border shadow-2xl rounded p-8">
        
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-arkanus-text-dim hover:text-arkanus-gold mb-6 transition-colors uppercase tracking-widest text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao Portal
        </button>

        <div className="text-center mb-8">
          <h1 className="font-display text-4xl text-arkanus-gold-light tracking-widest">Nova Soberania</h1>
          <p className="text-arkanus-text-dim mt-2 font-serif italic text-lg">Estabeleça seu domínio sob o firmamento arcano.</p>
        </div>

        <form onSubmit={handleCreate} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-arkanus-gold-light">Mago Fundador</label>
              <input 
                required
                type="text" 
                value={formData.mageName}
                onChange={e => setFormData({ ...formData, mageName: e.target.value })}
                placeholder="Ex: Severian"
                className="w-full bg-[#0a0806] border border-arkanus-border rounded px-4 py-3 text-arkanus-text focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-arkanus-gold-light">Nome da Soberania</label>
              <input 
                required
                type="text" 
                value={formData.covenantName}
                onChange={e => setFormData({ ...formData, covenantName: e.target.value })}
                placeholder="Ex: Arkanus"
                className="w-full bg-[#0a0806] border border-arkanus-border rounded px-4 py-3 text-arkanus-text focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-arkanus-gold-light">Tradição / Casa</label>
              <select
                value={formData.tradition}
                onChange={e => setFormData({ ...formData, tradition: e.target.value })}
                className="w-full bg-[#0a0806] border border-arkanus-border rounded px-4 py-3 text-arkanus-text focus:outline-none focus:border-amber-500/50 transition-colors appearance-none"
              >
                <option value="Mercúrio">Casa de Mercúrio (Diplomacia)</option>
                <option value="Flambeau">Casa de Flambeau (Conflito, Fogo)</option>
                <option value="Bonisagus">Casa de Bonisagus (Pesquisa, Teoria)</option>
                <option value="Verditius">Casa de Verditius (Itens, Prata)</option>
                <option value="Tremere">Casa de Tremere (Política, Segurança)</option>
                <option value="Ex Miscellanea">Ex Miscellanea (Flexível)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-arkanus-gold-light">Tribunal Arcano</label>
              <select
                value={formData.region}
                onChange={e => setFormData({ ...formData, region: e.target.value })}
                className="w-full bg-[#0a0806] border border-arkanus-border rounded px-4 py-3 text-arkanus-text focus:outline-none focus:border-amber-500/50 transition-colors appearance-none"
              >
                <option value="Rhine">Tribunal do Reno (Sacro/Denso)</option>
                <option value="Normandy">Tribunal da Normandia (Conflitante)</option>
                <option value="Stonehenge">Tribunal de Stonehenge (Isolado)</option>
                <option value="Iberia">Tribunal da Ibéria (Cruzadas)</option>
                <option value="Rome">Tribunal de Roma (Político/Antigo)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-arkanus-gold-light">Dificuldade</label>
              <select
                value={formData.difficulty}
                onChange={e => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full bg-[#0a0806] border border-arkanus-border rounded px-4 py-3 text-arkanus-text focus:outline-none focus:border-amber-500/50 transition-colors appearance-none"
              >
                <option value="Easy">Fácil</option>
                <option value="Normal">Normal</option>
                <option value="Hard">Difícil</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-arkanus-gold-light">Modo de Jogo</label>
              <select
                value={formData.gameMode}
                onChange={e => setFormData({ ...formData, gameMode: e.target.value })}
                className="w-full bg-[#0a0806] border border-arkanus-border rounded px-4 py-3 text-arkanus-text focus:outline-none focus:border-amber-500/50 transition-colors appearance-none"
              >
                <option value="Standard">Padrão</option>
                <option value="Sandbox">Sandbox livre</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs uppercase tracking-[0.2em] text-arkanus-gold-light">Perfil Inicial</label>
            <div className="grid grid-cols-2 gap-3">
              {archetypes.map(arch => (
                <button
                  key={arch.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, archetype: arch.id })}
                  className={`flex flex-col p-4 border rounded text-left transition-all ${
                    formData.archetype === arch.id 
                      ? 'bg-amber-950/30 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.15)]' 
                      : 'bg-[#0a0806] border-arkanus-border hover:border-amber-900/50'
                  }`}
                >
                  <span className={`font-display text-lg mb-1 ${formData.archetype === arch.id ? 'text-amber-300' : 'text-arkanus-text'}`}>
                    {arch.name}
                  </span>
                  <span className="text-xs text-arkanus-text-dim">
                    {arch.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-arkanus-border flex justify-end">
            <button 
              type="submit"
              className="py-3 px-8 bg-arkanus-gold text-stone-900 font-medium uppercase tracking-[0.15em] text-sm rounded shadow-[0_0_15px_rgba(202,138,4,0.3)] hover:bg-amber-300 hover:shadow-[0_0_25px_rgba(202,138,4,0.5)] transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Fundar Soberania
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
