import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGameState } from '../context/GameContext';
import { Play, LogOut, Plus, BookOpen, Trash2, AlertTriangle, Loader2 } from 'lucide-react';

export const PortalScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const { state, deleteCampaign } = useGameState();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirmText !== 'APAGAR') return;
    setIsDeleting(true);
    try {
      await deleteCampaign();
      setShowDeleteModal(false);
      setConfirmText('');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-arkanus-bg text-arkanus-text relative justify-center items-center">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1410] via-[#050403] to-[#020101] z-0"></div>

      <div className="relative z-10 w-full max-w-2xl bg-arkanus-panel border border-arkanus-border shadow-2xl rounded p-8">

        {/* Header Portal */}
        <div className="flex justify-between items-start mb-8 border-b border-arkanus-border pb-6">
          <div className="flex items-center gap-4">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Avatar" className="w-16 h-16 rounded-full border-2 border-arkanus-border-highlight shadow-[0_0_15px_rgba(202,138,4,0.3)]" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-stone-800 border-2 border-arkanus-border-highlight shadow-[0_0_15px_rgba(202,138,4,0.3)] flex items-center justify-center text-xl font-display">
                {user?.displayName?.[0] || 'A'}
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-arkanus-text-dim text-sm uppercase tracking-wider">Bem-vindo(a),</span>
              <h2 className="font-display text-2xl text-arkanus-gold-light">{user?.displayName || user?.email}</h2>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 text-arkanus-text-dim hover:text-arkanus-red transition-colors text-sm uppercase tracking-wider"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>

        {/* Main Content Blocks */}
        <div className="grid grid-cols-2 gap-4">

          {/* Continue Campaign Block */}
          <div className="col-span-2 relative group">
            <button
              onClick={() => navigate('/game/dashboard')}
              className="w-full bg-[#1a1511] border border-arkanus-border hover:border-amber-500/50 rounded p-6 flex items-center justify-between transition-all duration-300 shadow-inner"
            >
              <div className="flex flex-col items-start gap-1">
                <span className="text-xs uppercase tracking-[0.2em] text-arkanus-gold mb-1">Campanha Atual</span>
                <h3 className="font-display text-2xl text-arkanus-text group-hover:text-amber-200 transition-colors">{state.covenant?.name || 'Arkanus'} — Ano {state.meta.year}</h3>
                <p className="font-serif italic text-arkanus-text-dim">{state.meta.season}</p>
              </div>

              <div className="w-14 h-14 rounded-full bg-arkanus-panel border border-arkanus-border-highlight flex items-center justify-center group-hover:bg-amber-900/40 group-hover:scale-110 transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                <Play className="w-6 h-6 text-amber-500 ml-1" />
              </div>
            </button>

            {/* Delete button — overlaid top-right of campaign card */}
            <button
              onClick={() => setShowDeleteModal(true)}
              className="absolute top-3 right-3 p-1.5 rounded text-arkanus-text-dim hover:text-arkanus-red hover:bg-red-900/20 transition-colors"
              title="Apagar campanha"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* New Game */}
          <button
            onClick={() => navigate('/create')}
            className="bg-[#1a1511] border border-arkanus-border hover:border-stone-500 rounded p-4 flex flex-col items-center justify-center gap-3 group transition-all duration-300"
          >
            <Plus className="w-6 h-6 text-stone-500 group-hover:text-stone-300" />
            <span className="text-sm uppercase tracking-widest text-stone-500 group-hover:text-stone-300">Nova Soberania</span>
          </button>

          {/* Codex Placeholder */}
          <button className="bg-arkanus-bg border border-arkanus-border hover:border-stone-500 rounded p-4 flex flex-col items-center justify-center gap-3 opacity-50 cursor-not-allowed group">
            <BookOpen className="w-6 h-6 text-stone-500 group-hover:text-stone-300" />
            <span className="text-sm uppercase tracking-widest text-stone-500 group-hover:text-stone-300">Codex Arcano</span>
          </button>

        </div>

        <div className="mt-8 text-center text-xs text-arkanus-text-dim font-serif italic opacity-70">
          Status: Salvo na nuvem via Firestore
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-arkanus-panel border border-arkanus-red/40 rounded shadow-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-arkanus-red shrink-0" />
              <h3 className="font-display text-xl text-arkanus-red tracking-wide">Apagar Campanha</h3>
            </div>

            <p className="text-arkanus-text-dim text-sm mb-2">
              Esta ação é <span className="text-arkanus-red font-medium">permanente e irreversível</span>. Todos os dados de <span className="text-arkanus-gold-light">{state.covenant?.name || 'Arkanus'}</span> serão apagados do servidor e do dispositivo.
            </p>

            <p className="text-arkanus-text-dim text-sm mb-5">
              Para confirmar, digite <span className="font-mono text-arkanus-red font-bold">APAGAR</span> abaixo:
            </p>

            <input
              type="text"
              value={confirmText}
              onChange={e => setConfirmText(e.target.value)}
              placeholder="APAGAR"
              className="w-full bg-arkanus-bg border border-arkanus-border focus:border-arkanus-red rounded px-4 py-2 text-arkanus-text text-sm mb-4 outline-none font-mono tracking-widest"
              autoFocus
            />

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setShowDeleteModal(false); setConfirmText(''); }}
                disabled={isDeleting}
                className="px-4 py-2 text-sm text-arkanus-text-dim hover:text-arkanus-text border border-arkanus-border hover:border-stone-500 rounded uppercase tracking-wider transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={confirmText !== 'APAGAR' || isDeleting}
                className="px-4 py-2 text-sm bg-arkanus-red/80 hover:bg-arkanus-red text-white rounded uppercase tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isDeleting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Apagando...</>
                ) : (
                  <><Trash2 className="w-4 h-4" /> Apagar definitivamente</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
