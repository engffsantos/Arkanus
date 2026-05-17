import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Sparkles } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { login } = useAuth();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-arkanus-bg text-arkanus-text justify-center items-center relative">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1410] via-[#050403] to-[#020101] z-0"></div>
      
      <div className="relative z-10 bg-arkanus-panel border border-arkanus-border p-10 rounded shadow-2xl flex flex-col items-center gap-6 max-w-md w-full">
         <div className="flex flex-col items-center gap-2">
            <h1 className="font-display text-4xl text-arkanus-gold tracking-[0.3em] uppercase">Arkanus</h1>
            <p className="text-arkanus-text-dim font-serif italic text-center">Governe uma soberania arcana por estações.</p>
         </div>

         <div className="w-full h-px bg-gradient-to-r from-transparent via-arkanus-border to-transparent my-2"></div>

         <button 
           onClick={login}
           className="w-full py-3 px-6 bg-arkanus-gold text-stone-900 border border-amber-400/50 hover:bg-amber-300 transition-colors uppercase tracking-[0.15em] font-medium text-sm rounded shadow-[0_0_15px_rgba(202,138,4,0.3)] hover:shadow-[0_0_25px_rgba(202,138,4,0.5)] flex justify-center items-center gap-3"
         >
           <Shield className="w-4 h-4" />
           Entrar com Google
         </button>
      </div>

       {/* Decorative */}
       <div className="absolute bottom-6 left-6 pointer-events-none z-20">
          <div className="w-16 h-16 rounded-full bg-red-900 border-2 border-red-950 flex items-center justify-center opacity-70 shadow-[0_4px_10px_rgba(0,0,0,0.5)] transform -rotate-[15deg]">
             <span className="font-display text-4xl text-red-950/40">♚</span>
          </div>
       </div>
    </div>
  );
};
