import React from 'react';
import { Coins, Scale, Droplets, ShieldCheck, Users, ChevronRight, TrendingUp, TrendingDown, X, Scroll } from 'lucide-react';
import { useGameState } from '../context/GameContext';

export const SeasonResultModal: React.FC = () => {
  const { state, dispatch } = useGameState();
  const result = state.lastTurnResult;

  if (!result) return null;

  const handleClose = () => {
    dispatch({ type: 'CLEAR_LAST_TURN_RESULT' });
  };

  const getStatIcon = (key: string) => {
    switch (key) {
      case 'prata':
        return <Coins className="w-4 h-4 text-yellow-600" />;
      case 'loyalty':
        return <Scale className="w-4 h-4 text-amber-700" />;
      case 'population':
        return <Users className="w-4 h-4 text-indigo-700" />;
      case 'publicHealth':
        return <Droplets className="w-4 h-4 text-teal-600" />;
      case 'security':
        return <ShieldCheck className="w-4 h-4 text-stone-600" />;
      default:
        return null;
    }
  };

  const getStatLabel = (key: string) => {
    switch (key) {
      case 'prata':
        return 'Prata';
      case 'loyalty':
        return 'Lealdade';
      case 'population':
        return 'População';
      case 'publicHealth':
        return 'Saúde Pública';
      case 'security':
        return 'Segurança';
      default:
        return key;
    }
  };

  const formatStatVal = (key: string, val: number) => {
    if (key === 'prata' || key === 'population') {
      return Math.floor(val).toString();
    }
    return `${Math.floor(val)}%`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      {/* Parchment container */}
      <div 
        className="relative w-full max-w-xl bg-[#e4d5be] border-4 border-[#b08c5c] rounded-[4px] p-6 sm:p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),inset_0_0_80px_rgba(150,110,60,0.2)] max-h-[90vh] overflow-y-auto flex flex-col gap-6"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(244,233,212,0.95) 0%, rgba(228,213,190,1) 100%)' }}
      >
        {/* Decorative corner flourishes */}
        <div className="absolute top-2 left-3 text-[#5c4a35]/40 font-serif text-lg">✥</div>
        <div className="absolute top-2 right-3 text-[#5c4a35]/40 font-serif text-lg">✥</div>
        <div className="absolute bottom-2 left-3 text-[#5c4a35]/40 font-serif text-lg">✥</div>
        <div className="absolute bottom-2 right-3 text-[#5c4a35]/40 font-serif text-lg">✥</div>

        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 text-[#5c4a35]/60 hover:text-[#5c4a35] transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center pb-4 border-b border-[#5c4a35]/30">
          <div className="flex justify-center mb-1 text-[#b08c5c]">
            <Scroll className="w-8 h-8 drop-shadow-md" />
          </div>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#8c6b45] font-display font-bold">Conselho de Arkanus</span>
          <h2 className="font-display text-2xl sm:text-3xl text-[#3a2210] uppercase tracking-wide mt-1 font-bold">
            Relatório de Turno
          </h2>
          <p className="text-xs sm:text-sm text-[#5c4a35]/80 font-serif italic mt-1">
            {result.season} • Ano {result.year} concluído
          </p>
        </div>

        {/* Action badge & narrative */}
        <div className="bg-white/40 border border-[#b08c5c]/40 rounded-[2px] p-4 text-[#3a2210] font-serif leading-relaxed text-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-[#5c4a35]/10 border border-[#5c4a35]/30 rounded-[1px] text-[10px] uppercase font-sans tracking-wider font-bold">
              Ação Executada
            </span>
            <span className="font-bold text-[#5c4a35] font-sans">{result.actionName}</span>
          </div>
          <p className="italic text-[#4a3219]">{result.description}</p>
        </div>

        {/* Stats Transitions: Before -> After */}
        <div>
          <h3 className="text-xs uppercase tracking-wider text-[#8c6b45] font-display font-bold mb-3 border-b border-[#5c4a35]/20 pb-1">
            Evolução dos Recursos da Soberania
          </h3>
          <div className="flex flex-col gap-2.5">
            {Object.keys(result.before).map((key) => {
              const beforeVal = result.before[key];
              const afterVal = result.after[key];
              const diff = afterVal - beforeVal;
              const isPositive = diff > 0;
              const isNegative = diff < 0;

              return (
                <div key={key} className="bg-white/20 hover:bg-white/35 transition-colors border border-[#b08c5c]/20 p-2.5 rounded-[2px] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-[#5c4a35]/5 border border-[#5c4a35]/15 rounded-full">
                      {getStatIcon(key)}
                    </div>
                    <span className="font-medium text-xs sm:text-sm text-[#3a2210] font-serif">{getStatLabel(key)}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-[#3a2210]/60 font-sans text-xs sm:text-sm">{formatStatVal(key, beforeVal)}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#5c4a35]/50" />
                    <span className="text-[#3a2210] font-bold font-sans text-xs sm:text-sm">{formatStatVal(key, afterVal)}</span>
                    
                    <div className="min-w-[60px] text-right">
                      {isPositive && (
                        <span className="text-green-800 text-xs font-bold font-sans flex items-center justify-end gap-0.5">
                          <TrendingUp className="w-3 h-3" />+{formatStatVal(key, diff)}
                        </span>
                      )}
                      {isNegative && (
                        <span className="text-red-800 text-xs font-bold font-sans flex items-center justify-end gap-0.5">
                          <TrendingDown className="w-3 h-3" />{formatStatVal(key, diff)}
                        </span>
                      )}
                      {!isPositive && !isNegative && (
                        <span className="text-[#5c4a35]/50 text-xs font-medium font-sans">—</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Gains and Losses overview */}
        {(result.gains.length > 0 || result.losses.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#1a5c1d]/5 border border-[#1a5c1d]/20 rounded-[2px] p-3">
              <span className="text-[10px] uppercase tracking-wider text-[#1a5c1d] font-bold block mb-1.5">Ganhos Gerais</span>
              {result.gains.length > 0 ? (
                <ul className="text-xs text-[#144d18] font-sans font-semibold space-y-1">
                  {result.gains.map((g: string, i: number) => (
                    <li key={i}>• {g}</li>
                  ))}
                </ul>
              ) : (
                <span className="text-xs text-[#3a2210]/50 italic">Nenhum ganho imediato</span>
              )}
            </div>

            <div className="bg-[#5c1a1a]/5 border border-[#5c1a1a]/20 rounded-[2px] p-3">
              <span className="text-[10px] uppercase tracking-wider text-[#8c2a2a] font-bold block mb-1.5">Custos e Perdas</span>
              {result.losses.length > 0 ? (
                <ul className="text-xs text-[#4d1414] font-sans font-semibold space-y-1">
                  {result.losses.map((l: string, i: number) => (
                    <li key={i}>• {l}</li>
                  ))}
                </ul>
              ) : (
                <span className="text-xs text-[#3a2210]/50 italic">Nenhuma perda imediata</span>
              )}
            </div>
          </div>
        )}

        {/* Council Recommendation for the next season */}
        <div className="bg-[#1c150e] border border-[#b08c5c]/40 rounded-[2px] p-4 shadow-inner">
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#ce9c56] font-display font-semibold block mb-1">
            Conselho Arcano Recomenda:
          </span>
          <p className="text-xs sm:text-sm leading-relaxed text-[#e5d4b3] font-serif italic">
            "{result.recommendation}"
          </p>
        </div>

        {/* Decree button */}
        <button 
          onClick={handleClose}
          className="w-full mt-2 relative group cursor-pointer rounded-[2px] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8c6b45] to-transparent group-hover:via-[#a07c52] transition duration-500 opacity-20"></div>
          <div className="relative w-full bg-gradient-to-b from-[#3a2210] to-[#25150a] border-y border-[#b08c5c] py-3.5 shadow-md flex items-center justify-center gap-3">
            <span className="text-[#ce9c56] text-sm">♔</span>
            <span className="font-display text-sm sm:text-base text-[#e5d4b3] tracking-[0.2em] uppercase font-bold">
              Decretar Próxima Estação
            </span>
            <span className="text-[#ce9c56] text-sm">♔</span>
          </div>
        </button>
      </div>
    </div>
  );
};
