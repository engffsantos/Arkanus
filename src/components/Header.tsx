import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Flower, Sun, Coins, Gem, Users, Shield, Zap, LogOut, Loader2, Cloud, CloudOff, Menu } from 'lucide-react';
import { useGameState } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { state, dispatch, isSaving } = useGameState();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const formatNumber = (num?: number) => (num || 0).toLocaleString('pt-BR');

  return (
    <header className="flex flex-col z-10 relative shadow-md">
      {/* Top Utility Bar */}
      <div className="flex justify-between items-center px-6 py-1 bg-[#0a0806] border-b border-arkanus-border text-xs">
         <div className="flex items-center gap-2 text-arkanus-text-dim">
           {isSaving ? (
             <>
               <Loader2 className="w-3 h-3 animate-spin text-arkanus-gold" />
               <span>Salvando...</span>
             </>
           ) : (
             <>
               <Cloud className="w-3 h-3 text-green-500" />
               <span>Salvo em segurança</span>
             </>
           )}
         </div>

         {user && (
           <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
               {user.photoURL ? (
                 <img src={user.photoURL} alt="Avatar" className="w-5 h-5 rounded-full border border-stone-700" />
               ) : (
                 <div className="w-5 h-5 rounded-full bg-stone-800 border border-stone-700" />
               )}
               <span className="text-arkanus-text-dim truncate max-w-[150px]">{user.displayName || user.email}</span>
             </div>
             
             <button 
               onClick={() => navigate('/')}
               className="text-arkanus-text-dim hover:text-arkanus-gold-light transition-colors flex items-center gap-1 uppercase tracking-wider"
               title="Voltar ao Portal"
             >
                Portal
             </button>
           </div>
         )}
      </div>

      <div className="flex items-center justify-between px-6 py-3 bg-arkanus-panel border-b border-arkanus-border">
        {/* Hamburger button (mobile only) */}
        <button onClick={onMenuToggle} className="md:hidden p-2 text-arkanus-gold-light">
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo / Title */}
        <div className="flex items-center space-x-3 w-auto md:w-1/4">
          <Compass className="w-8 h-8 text-arkanus-gold" />
          <h1 className="font-display text-3xl text-arkanus-gold-light tracking-wide">Arkanus</h1>
        </div>

        {/* Resources Top Bar */}
        <div className="hidden md:flex items-center justify-center space-x-6 flex-1 text-sm font-sans">
          <ResourceItem icon={<Coins className="w-4 h-4 text-gray-300" />} label="Prata" value={formatNumber(Math.floor(state.resources.prata))} delta="+320" deltaColor="text-arkanus-green" />
          <ResourceItem icon={<Gem className="w-4 h-4 text-arkanus-blue" />} label="Essência" value={formatNumber(state.resources.essencia?.total || 0)} delta="+12" deltaColor="text-arkanus-green" />
          <ResourceItem icon={<div className="w-4 h-4 bg-red-800 rounded-full border border-red-500 shadow-[0_0_5px_rgba(255,0,0,0.5)] flex items-center justify-center"><div className="w-2 h-2 bg-red-400 rounded-full"></div></div>} label="Lealdade" value={state.covenant.loyalty} delta="+5" deltaColor="text-arkanus-green" />
          <ResourceItem icon={<Users className="w-4 h-4 text-amber-600" />} label="População" value={formatNumber(state.covenant.population)} delta="+18" deltaColor="text-arkanus-green" />
          <ResourceItem icon={<Zap className="w-4 h-4 text-blue-400" />} label="Aura Arcana" value={formatNumber(state.covenant.auraArcana)} info="Estável" infoColor="text-arkanus-blue" />
          <ResourceItem icon={<Sun className="w-4 h-4 text-yellow-400" />} label="Aura Sacra" value={formatNumber(state.covenant.auraSacra)} info="Estável" infoColor="text-arkanus-gold" />
        </div>

        {/* Season / Year */}
        <div className="flex flex-col items-end justify-center w-1/4">
          <div className="flex items-center space-x-3 text-arkanus-gold-light font-display text-xl">
            <Flower className="w-5 h-5 text-green-400" />
            <span>{state.meta.season} — Ano {state.meta.year}</span>
            <Sun className="w-6 h-6 text-yellow-500" />
          </div>
          {state.meta.primaryAction ? (
            <div className="mt-1 flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-amber-500 font-medium truncate max-w-[120px]">{state.meta.primaryAction.subAction}</span>
              <button 
                onClick={() => dispatch({ type: 'ADVANCE_TURN', payload: { selectedActionId: state.meta.primaryAction!.id, actionDetails: {} } })}
                className="px-3 py-1 bg-arkanus-gold text-stone-900 border border-transparent rounded text-[10px] uppercase tracking-widest font-bold hover:bg-amber-300 shadow-[0_0_10px_rgba(202,138,4,0.3)] transition-all"
              >
                Avançar
              </button>
            </div>
          ) : (
            <div className="mt-1 text-[10px] uppercase tracking-widest text-green-500/70">Aguardando Ação</div>
          )}
        </div>
      </div>
    </header>
  );
};

const ResourceItem = ({ icon, label, value, delta, deltaColor, info, infoColor }: any) => (
  <div className="flex items-center space-x-2 bg-arkanus-bg px-3 py-1.5 rounded border border-arkanus-border">
    {icon}
    <div className="flex flex-col leading-none">
      <span className="text-[10px] text-arkanus-text-dim uppercase tracking-wider">{label}</span>
      <div className="flex items-baseline space-x-2 mt-0.5">
        <span className="text-base text-arkanus-gold-light font-serif">{value}</span>
        {delta && <span className={`text-[10px] ${deltaColor}`}>{delta} /est.</span>}
        {info && <span className={`text-[10px] ${infoColor}`}>{info}</span>}
      </div>
    </div>
  </div>
);
