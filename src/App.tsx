import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { LoginScreen } from './components/LoginScreen';
import { PortalScreen } from './components/PortalScreen';
import { GameLayout } from './components/layout/GameLayout';
import { CreateSovereigntyScreen } from './components/screens/CreateSovereigntyScreen';
import { ActionsScreen } from './components/screens/ActionsScreen';
import { LaboratoryScreen } from './components/screens/LaboratoryScreen';
import { ReportsScreen } from './components/screens/ReportsScreen';
import { LibraryScreen } from './components/screens/LibraryScreen';
import { GovernanceScreen } from './components/screens/GovernanceScreen';
import { MapScreen } from './components/screens/MapScreen';
import { HealthScreen } from './components/screens/HealthScreen';
import { ChartersScreen } from './components/screens/ChartersScreen';
import { GuildsScreen } from './components/screens/GuildsScreen';
import { CommerceScreen } from './components/screens/CommerceScreen';
import { DiplomacyScreen } from './components/screens/DiplomacyScreen';
import { ConflictsScreen } from './components/screens/ConflictsScreen';
import { CodexScreen } from './components/screens/CodexScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { MageScreen } from './components/screens/MageScreen';

import { SovereigntyPanel } from './components/SovereigntyPanel';
import { ActionsPanel } from './components/ActionsPanel';
import { MagePanel } from './components/MagePanel';
import { LabPanel } from './components/LabPanel';
import { useGameState } from './context/GameContext';
import { SeasonResultModal } from './components/SeasonResultModal';

const DashboardContent = () => {
  const { state } = useGameState();
  const showMission = state.meta.year === 1;
  const isPrataOk = state.resources.prata > 0;
  const isPopOk = state.covenant.population > 80;
  const isLoyaltyOk = state.covenant.loyalty > 40;
  const seasonsProgress = Math.min(4, state.meta.turn - 1);

  return (
    <div className="flex flex-col gap-4 h-full">
      <SeasonResultModal />
      {showMission && (
        <div className="bg-gradient-to-r from-[#1d1610] via-[#2c1f15] to-[#1d1610] border border-[#ce9c56]/40 rounded p-4 shadow-lg text-arkanus-text relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="absolute top-0 right-0 p-1.5 bg-[#ce9c56]/15 text-[#ce9c56]/60 uppercase tracking-[0.2em] text-[8px] border-l border-b border-[#ce9c56]/30">Objetivo Inicial</div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#ce9c56]/10 border border-[#ce9c56]/30 flex items-center justify-center shrink-0 mt-1 shadow-[0_0_10px_rgba(206,156,86,0.2)]">
              <span className="text-[#ce9c56] text-lg font-serif">♔</span>
            </div>
            <div className="flex flex-col">
              <h4 className="text-[#ce9c56] font-display text-sm uppercase tracking-wider">Missão de Consolidação da Soberania</h4>
              <p className="text-xs text-arkanus-text-dim mt-0.5 leading-relaxed max-w-xl">
                Você governa uma Soberania Arcana! Cada estação é um turno estratégico onde você escolhe uma ação primária.
                Sobreviva pelas primeiras **4 estações (Ano I completo)** atendendo às exigências mínimas do Conselho:
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[11px] font-medium">
                <span className={`flex items-center gap-1 ${isPrataOk ? 'text-green-400' : 'text-red-400 font-bold animate-pulse'}`}>
                  {isPrataOk ? '✓' : '✗'} Prata &gt; 0 ({Math.floor(state.resources.prata)})
                </span>
                <span className={`flex items-center gap-1 ${isPopOk ? 'text-green-400' : 'text-red-400 font-bold animate-pulse'}`}>
                  {isPopOk ? '✓' : '✗'} População &gt; 80 ({state.covenant.population})
                </span>
                <span className={`flex items-center gap-1 ${isLoyaltyOk ? 'text-green-400' : 'text-red-400 font-bold animate-pulse'}`}>
                  {isLoyaltyOk ? '✓' : '✗'} Lealdade &gt; 40 ({state.covenant.loyalty})
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end shrink-0 gap-1 min-w-[120px]">
            <span className="text-[10px] text-arkanus-text-dim uppercase tracking-wider">Progresso da Missão</span>
            <div className="text-sm font-serif font-bold text-[#ce9c56]">
              {seasonsProgress} / 4 estações
            </div>
            <div className="w-28 h-1.5 bg-stone-900 rounded-full border border-stone-850 overflow-hidden mt-1">
              <div className="h-full bg-gradient-to-r from-[#ce9c56] to-amber-400 rounded-full transition-all duration-500" style={{ width: `${(seasonsProgress / 4) * 100}%` }}></div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-full">
        {/* Left Column - Sovereignty */}
        <div className="col-span-1 md:col-span-3">
          <SovereigntyPanel />
        </div>

        {/* Center Column - Actions & Logs */}
        <div className="col-span-1 md:col-span-6 flex flex-col gap-4">
            {/* Top Actions */}
            <div className="flex-1 min-h-[400px]">
              <ActionsPanel />
            </div>
        </div>

        {/* Right Column - Mage & Lab */}
        <div className="col-span-1 md:col-span-3 flex flex-col gap-4">
            {/* Top: Mage Stats */}
            <div className="flex-[1.2]">
              <MagePanel />
            </div>
            
            {/* Bottom: Lab Stats */}
            <div className="flex-1">
              <LabPanel />
            </div>
        </div>
      </div>
    </div>
  );
};

const PlaceholderScreen = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-full">
    <h1 className="font-display text-4xl text-arkanus-text-dim/50 tracking-widest uppercase">{title}</h1>
  </div>
);

// Loading screen
const LoadingScreen = () => (
  <div className="flex flex-col h-screen overflow-hidden bg-arkanus-bg text-arkanus-text justify-center items-center">
    <p className="font-display text-lg text-arkanus-gold tracking-[0.2em] uppercase animate-pulse">Carregando Arcanos...</p>
  </div>
);

// Auth guard: bloqueia rotas privadas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// Public route: redireciona usuário autenticado que volta do OAuth
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (user) return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginScreen /></PublicRoute>} />
        
        <Route path="/" element={<ProtectedRoute><PortalScreen /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreateSovereigntyScreen /></ProtectedRoute>} />
        
        <Route path="/game" element={<ProtectedRoute><GameLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/game/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardContent />} />
          <Route path="magus" element={<MageScreen />} />
          <Route path="mapa" element={<MapScreen />} />
          <Route path="acoes" element={<ActionsScreen />} />
          <Route path="laboratorio" element={<LaboratoryScreen />} />
          <Route path="biblioteca" element={<LibraryScreen />} />
          <Route path="governanca" element={<GovernanceScreen />} />
          <Route path="forais" element={<ChartersScreen />} />
          <Route path="guildas" element={<GuildsScreen />} />
          <Route path="comercio" element={<CommerceScreen />} />
          <Route path="diplomacia" element={<DiplomacyScreen />} />
          <Route path="conflitos" element={<ConflictsScreen />} />
          <Route path="saude" element={<HealthScreen />} />
          <Route path="codex" element={<CodexScreen />} />
          <Route path="configuracoes" element={<SettingsScreen />} />
          <Route path="relatorios" element={<ReportsScreen />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
