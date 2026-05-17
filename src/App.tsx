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

const DashboardContent = () => (
  <div className="grid grid-cols-12 gap-4 h-full">
    {/* Left Column - Sovereignty */}
    <div className="col-span-3 min-w-[280px]">
      <SovereigntyPanel />
    </div>

    {/* Center Column - Actions & Logs */}
    <div className="col-span-6 flex flex-col gap-4">
        {/* Top Actions */}
        <div className="flex-1 min-h-[400px]">
          <ActionsPanel />
        </div>
    </div>

    {/* Right Column - Mage & Lab */}
    <div className="col-span-3 min-w-[280px] flex flex-col gap-4">
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
);

const PlaceholderScreen = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-full">
    <h1 className="font-display text-4xl text-arkanus-text-dim/50 tracking-widest uppercase">{title}</h1>
  </div>
);

// Auth guard component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex flex-col h-screen overflow-hidden bg-arkanus-bg text-arkanus-text justify-center items-center">
         <p className="font-display text-lg text-arkanus-gold tracking-[0.2em] uppercase animate-pulse">Carregando Arcanos...</p>
      </div>
    );
  }
  
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        
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
