import React from 'react';
import { useGameState } from '../../context/GameContext';
import { PieChart, TrendingUp, TrendingDown, Coins, Users, Shield, HeartPulse } from 'lucide-react';

export const ReportsScreen: React.FC = () => {
  const { state } = useGameState();
  const c = state.covenant;

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex justify-between items-center pb-4 border-b border-arkanus-border">
        <div>
          <h2 className="font-display text-3xl text-arkanus-gold-light tracking-wide flex items-center gap-3">
             <PieChart className="w-8 h-8 text-amber-500" /> Relatórios do Domínio
          </h2>
          <p className="text-arkanus-text-dim mt-2 font-serif italic max-w-2xl">
            "Aquele que não conta sua prata e seus servos, logo não terá nem a vida."
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm uppercase tracking-widest text-arkanus-text-dim">Balanço Sazonal</div>
          <div className={`font-display text-3xl ${c.incomePerSeason >= c.expensesPerSeason ? 'text-green-400' : 'text-red-400'}`}>
            {c.incomePerSeason >= c.expensesPerSeason ? '+' : '-'}{Math.abs(c.incomePerSeason - c.expensesPerSeason)} Prata
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 overflow-y-auto custom-scrollbar pr-2 pb-6">
         <div className="bg-[#0a0806] border border-arkanus-border rounded p-6">
            <h3 className="font-display text-xl text-amber-300 flex items-center gap-2 mb-4"><Coins className="w-5 h-5"/> Tesouro e Economia</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-stone-400">Renda Bruta (Estação)</span>
                <span className="text-green-400">+{c.incomePerSeason}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Despesas e Manutenção</span>
                <span className="text-red-400">-{c.expensesPerSeason}</span>
              </div>
              <div className="h-px bg-stone-800 my-2"></div>
              <div className="flex justify-between font-bold">
                <span className="text-stone-300">Lucro Líquido</span>
                <span className={c.incomePerSeason >= c.expensesPerSeason ? 'text-green-400' : 'text-red-400'}>
                  {c.incomePerSeason - c.expensesPerSeason}
                </span>
              </div>
              <div className="flex justify-between mt-4 items-center">
                <span className="text-stone-400 uppercase tracking-widest text-xs">Tesouro Atual</span>
                <span className="text-xl text-arkanus-gold">{Math.floor(state.resources.prata)}</span>
              </div>
            </div>
         </div>

         <div className="bg-[#0a0806] border border-arkanus-border rounded p-6">
            <h3 className="font-display text-xl text-amber-300 flex items-center gap-2 mb-4"><Users className="w-5 h-5"/> População e Estabilidade</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-stone-400">População Total</span>
                <span className="text-stone-200">{Math.floor(state.covenant.population)} servos</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-400">Lealdade</span>
                <span className="text-stone-200">{Math.floor(c.loyalty)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-400">Risco de Revolta (Unrest)</span>
                <span className={c.unrest > 50 ? 'text-red-400' : 'text-green-400'}>{Math.floor(c.unrest)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-400">Prosperidade</span>
                <span className="text-stone-200">{Math.floor(c.prosperity)}%</span>
              </div>
            </div>
         </div>

         <div className="bg-[#0a0806] border border-arkanus-border rounded p-6">
            <h3 className="font-display text-xl text-amber-300 flex items-center gap-2 mb-4"><HeartPulse className="w-5 h-5"/> Saúde Pública</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-stone-400">Nível Sanitário</span>
                <span className="text-stone-200">{Math.floor(c.publicHealth)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-400">Risco Epidemiológico</span>
                <span className={state.health.epidemicRisk > 50 ? 'text-red-400' : 'text-stone-200'}>{Math.floor(state.health.epidemicRisk)}%</span>
              </div>
            </div>
         </div>

         <div className="bg-[#0a0806] border border-arkanus-border rounded p-6">
            <h3 className="font-display text-xl text-amber-300 flex items-center gap-2 mb-4"><Shield className="w-5 h-5"/> Segurança e Defesa</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-stone-400">Nível de Segurança Militar</span>
                <span className="text-stone-200">{Math.floor(c.security)}%</span>
              </div>
              <div className="flex items-start gap-2 mt-4 p-3 bg-red-950/20 border border-red-900/30 rounded text-sm text-stone-400">
                <Shield className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p>Uma segurança abaixo de 40% permite o ataque de bandoleiros ou incursões de nobres nas estações de Outono e Inverno.</p>
              </div>
            </div>
         </div>
      </div>
    </div>
  );
};
