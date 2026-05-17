import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Castle, Map, Zap, FlaskConical, Book, Feather, 
  Scale, FileText, Hammer, ArrowRightLeft, Handshake, 
  Swords, HeartPulse, PieChart, BookOpen, Settings, User 
} from 'lucide-react';

export const GameSidebar: React.FC = () => {
  const navItems = [
    { to: '/game/dashboard', icon: Castle, label: 'Soberania' },
    { to: '/game/magus', icon: User, label: 'Ficha Arcana' },
    { to: '/game/mapa', icon: Map, label: 'Mapa' },
    { to: '/game/acoes', icon: Zap, label: 'Ações Sazonais' },
    { to: '/game/laboratorio', icon: FlaskConical, label: 'Laboratório' },
    { to: '/game/biblioteca', icon: Book, label: 'Biblioteca' },
    { to: '/game/governanca', icon: Scale, label: 'Governança' },
    { to: '/game/forais', icon: FileText, label: 'Forais e Auras' },
    { to: '/game/guildas', icon: Hammer, label: 'Guildas' },
    { to: '/game/comercio', icon: ArrowRightLeft, label: 'Comércio' },
    { to: '/game/diplomacia', icon: Handshake, label: 'Diplomacia' },
    { to: '/game/conflitos', icon: Swords, label: 'Conflitos' },
    { to: '/game/saude', icon: HeartPulse, label: 'Saúde Pública' },
    { to: '/game/relatorios', icon: PieChart, label: 'Relatórios' },
  ];

  return (
    <aside className="w-56 bg-[#0a0806] border-r border-arkanus-border flex flex-col h-full overflow-y-auto">
      <nav className="flex-1 py-4 flex flex-col gap-1 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                isActive 
                  ? 'bg-amber-900/40 text-arkanus-gold-light border border-amber-500/30' 
                  : 'text-arkanus-text-dim hover:bg-arkanus-panel hover:text-arkanus-text'
              }`
            }
          >
            <item.icon className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-arkanus-border p-3 flex flex-col gap-1">
        <NavLink to="/game/codex" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded transition-colors ${isActive ? 'bg-amber-900/40 text-arkanus-gold-light' : 'text-arkanus-text-dim hover:text-arkanus-text'}`}>
          <BookOpen className="w-4 h-4" />
          <span className="text-sm">Codex</span>
        </NavLink>
        <NavLink to="/game/configuracoes" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded transition-colors ${isActive ? 'bg-amber-900/40 text-arkanus-gold-light' : 'text-arkanus-text-dim hover:text-arkanus-text'}`}>
          <Settings className="w-4 h-4" />
          <span className="text-sm">Configurações</span>
        </NavLink>
      </div>
    </aside>
  );
};
