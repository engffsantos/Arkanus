import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { GameSidebar } from './GameSidebar';
import { EventLogPanel } from '../EventLogPanel';

export const GameLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-arkanus-bg text-arkanus-text selection:bg-amber-900/50 relative">
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none mix-blend-overlay z-0 mix-blend-screen"></div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#050403]/80 to-[#020101] z-0"></div>

      <Header />

      <div className="flex flex-1 overflow-hidden z-10 relative">
        <GameSidebar />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6">
          <Outlet />
        </main>
      </div>

      <div className="z-20">
         <EventLogPanel />
      </div>
    </div>
  );
};
