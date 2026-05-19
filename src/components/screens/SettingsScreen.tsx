import React, { useState, useRef } from 'react';
import { Settings as SettingsIcon, LogOut, Trash2, AlertTriangle, Save, Download, Upload, Server, Smartphone, Activity, Info, User, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useGameState } from '../../context/GameContext';
import { createInitialGameState } from '../../services/campaignCreator';

export const SettingsScreen: React.FC = () => {
   const { user, logout } = useAuth();
   const { state, dispatch } = useGameState();
   
   const [resetInput, setResetInput] = useState('');
   const [showConfirmReset, setShowConfirmReset] = useState(false);
   
   const fileInputRef = useRef<HTMLInputElement>(null);

   const handleLogout = async () => {
       try {
           await logout();
       } catch (error) {
           console.error("Error logging out", error);
       }
   };

   const handleResetCampaign = () => {
       if (resetInput !== 'REINICIAR') return;
       
       setShowConfirmReset(false);
       setResetInput('');
       
       // Force reset state
       const newState = createInitialGameState({
           covenantName: 'Soberania Nova',
           mageName: 'Mago Novo',
           tradition: 'Bonisagus',
           region: 'Rhine',
           archetype: 'Laboratory',
           difficulty: 'Normal',
           gameMode: 'Standard'
       });
       dispatch({ type: 'LOAD_STATE', payload: newState });
   };

   const handleForceSave = () => {
       dispatch({ type: 'RESOLVE_ACTION', payload: { type: 'FORCE_SAVE' } });
       alert("Pedido de salvamento enviado!");
   };

   const handleExportSave = () => {
       const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
       const downloadAnchorNode = document.createElement('a');
       downloadAnchorNode.setAttribute("href",     dataStr);
       downloadAnchorNode.setAttribute("download", `arkanus_save_ano_${state.meta.year}_${state.meta.season.toLowerCase()}.json`);
       document.body.appendChild(downloadAnchorNode);
       downloadAnchorNode.click();
       downloadAnchorNode.remove();
   };

   const handleImportClick = () => {
       if (fileInputRef.current) {
           fileInputRef.current.click();
       }
   };

   const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
       const file = event.target.files?.[0];
       if (!file) return;

       const reader = new FileReader();
       reader.onload = (e) => {
           try {
               const parsedState = JSON.parse(e.target?.result as string);
               if (parsedState && parsedState.meta && parsedState.meta.saveVersion) {
                   dispatch({ type: 'LOAD_STATE', payload: parsedState });
                   alert("Campanha importada com sucesso!");
               } else {
                   alert("Save inválido: não parece ser um save do Arkanus.");
               }
           } catch (error) {
               alert("Erro ao ler o arquivo. Tem certeza que é um JSON válido?");
           }
       };
       reader.readAsText(file);
       event.target.value = '';
   };

   return (
      <div className="h-full flex flex-col gap-6">
         <div>
            <h1 className="font-display text-3xl text-stone-200 tracking-wider">Configurações & Sistema</h1>
            <p className="text-stone-400 mt-2">Proteja sua conta, campanha, save e preferências locais.</p>
         </div>

         <div className="flex-1 bg-arkanus-panel border border-arkanus-border shadow-inner rounded overflow-y-auto custom-scrollbar p-6">
             <div className="max-w-4xl mx-auto space-y-10">
                 
                 {/* Conta */}
                 <section>
                    <h2 className="text-xl font-display text-stone-300 mb-4 flex items-center gap-2 border-b border-stone-800 pb-2">
                       <User className="w-5 h-5 text-amber-700" /> Conta e Sessão Segura
                    </h2>
                    <div className="bg-[#1a1511] p-5 rounded border border-stone-800 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center overflow-hidden">
                                {user?.photoURL ? <img src={user.photoURL} alt="Avatar" /> : <User className="w-6 h-6 text-stone-500" />}
                            </div>
                            <div>
                                <div className="font-bold text-stone-200">{user?.displayName || 'Mago Desconhecido'}</div>
                                <div className="text-sm text-stone-400">{user?.email || 'Sessão local apenas'}</div>
                                <div className="text-xs text-stone-500 mt-1 font-mono">UID: {user?.uid.substring(0, 8)}...</div>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="px-4 py-2 border border-stone-700 hover:border-amber-900/50 text-stone-300 rounded hover:bg-[#251e18] transition-colors flex items-center gap-2 text-sm">
                            <LogOut className="w-4 h-4" /> Desconectar Sessão
                        </button>
                    </div>
                 </section>

                 {/* Campanha */}
                 <section>
                    <h2 className="text-xl font-display text-stone-300 mb-4 flex items-center gap-2 border-b border-stone-800 pb-2">
                       <FileText className="w-5 h-5 text-indigo-500" /> Status da Campanha
                    </h2>
                    <div className="bg-[#1a1511] p-5 rounded border border-stone-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                            <div className="text-xs text-stone-500 uppercase tracking-widest">Soberania</div>
                            <div className="text-stone-200 font-bold">{state.covenant.name}</div>
                        </div>
                        <div>
                            <div className="text-xs text-stone-500 uppercase tracking-widest">Mago</div>
                            <div className="text-stone-200">{state.mage.name}</div>
                        </div>
                        <div>
                            <div className="text-xs text-stone-500 uppercase tracking-widest">Tempo Decorrido</div>
                            <div className="text-stone-200">Ano {state.meta.year} ({state.meta.season})</div>
                        </div>
                        <div>
                            <div className="text-xs text-stone-500 uppercase tracking-widest">Perfil</div>
                            <div className="text-stone-200">{state.mage.tradition} • {state.meta.difficulty}</div>
                        </div>
                    </div>
                 </section>

                 {/* Save e Nuvem */}
                 <section>
                    <h2 className="text-xl font-display text-stone-300 mb-4 flex items-center gap-2 border-b border-stone-800 pb-2">
                       <Server className="w-5 h-5 text-emerald-600" /> Save & Nuvem
                    </h2>
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4 bg-[#1a1511] p-5 rounded border border-stone-800 justify-between items-center">
                           <div className="flex-1 text-center sm:text-left">
                              <div className="font-bold text-stone-200">Sincronização Ativa</div>
                              <div className="text-sm text-stone-400 mt-1">Sua campanha salva automaticamente a cada ação e virada de estação. Você também pode baixar o save localmente por segurança.</div>
                              <div className="text-xs text-stone-500 mt-2 font-mono">Save Version: {state.meta.saveVersion} | UID Vinculado</div>
                           </div>
                           <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
                                <button onClick={handleForceSave} className="px-4 py-2 bg-emerald-900/30 text-emerald-400 hover:bg-emerald-900/50 border border-emerald-900/50 rounded transition-colors flex items-center gap-2 text-sm shadow">
                                    <Save className="w-4 h-4" /> Salvar Agora
                                </button>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-[#1a1511] p-4 rounded border border-stone-800 flex justify-between items-center">
                                <div>
                                    <div className="font-bold text-stone-300 text-sm">Exportar Campanha</div>
                                    <div className="text-xs text-stone-500">Baixa um arquivo .json</div>
                                </div>
                                <button onClick={handleExportSave} className="p-2 border border-stone-700 text-stone-300 rounded hover:bg-stone-800 transition-colors">
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="bg-[#1a1511] p-4 rounded border border-stone-800 flex justify-between items-center">
                                <div>
                                    <div className="font-bold text-stone-300 text-sm">Importar Campanha</div>
                                    <div className="text-xs text-stone-500">Carrega a partir de arquivo local</div>
                                </div>
                                <div>
                                    <input 
                                        type="file" 
                                        accept=".json" 
                                        className="hidden" 
                                        ref={fileInputRef} 
                                        onChange={handleFileImport} 
                                    />
                                    <button onClick={handleImportClick} className="p-2 border border-stone-700 text-stone-300 rounded hover:bg-stone-800 transition-colors">
                                        <Upload className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                 </section>

                 {/* Diagnóstico PWA */}
                 <section>
                    <h2 className="text-xl font-display text-stone-300 mb-4 flex items-center gap-2 border-b border-stone-800 pb-2">
                       <Activity className="w-5 h-5 text-blue-500" /> Diagnóstico & PWA
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#1a1511] p-4 rounded border border-stone-800">
                            <div className="flex items-center gap-2 mb-2"><Smartphone className="w-4 h-4 text-stone-400" /> <span className="font-bold text-stone-200">Manifest PWA</span></div>
                            <div className="text-sm text-stone-400">Instalável via Browser (gerado via VitePWA). Permite jogar Arkanus em fullscreen localmente.</div>
                        </div>
                        <div className="bg-[#1a1511] p-4 rounded border border-stone-800">
                            <div className="flex items-center gap-2 mb-2"><Info className="w-4 h-4 text-stone-400" /> <span className="font-bold text-stone-200">Ambiente de Operação</span></div>
                            <div className="text-sm text-stone-400">
                                <div><span className="text-stone-500">NodeEnv:</span> production</div>
                                <div><span className="text-stone-500">Build:</span> Arkanus 1.0 Real</div>
                            </div>
                        </div>
                    </div>
                 </section>

                 {/* Reset */}
                 <section className="pt-4 border-t border-red-900/10">
                    <div className="bg-red-950/10 p-5 rounded border border-red-900/30">
                        <div className="flex items-center gap-2 mb-2 text-red-500">
                            <AlertTriangle className="w-5 h-5" /> 
                            <h3 className="font-display text-lg font-bold">Zona de Perigo: Reiniciar Campanha</h3>
                        </div>
                        <p className="text-sm text-red-400/80 mb-4">
                            Esta ação apagará todo o progresso na campanha atual. Se quiser manter sua história salva, exporte o arquivo JSON primeiro nas opções acima.
                        </p>
                        
                        {!showConfirmReset ? (
                            <button 
                                onClick={() => setShowConfirmReset(true)}
                                className="px-4 py-2 border border-red-900/50 text-red-400 rounded hover:bg-red-900/30 transition-colors flex items-center gap-2 text-sm"
                            >
                                <Trash2 className="w-4 h-4" /> Resetar Soberania
                            </button>
                        ) : (
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-red-950/50 p-4 border border-red-900 rounded">
                                <div className="text-sm text-red-300">
                                    Para confirmar, digite <strong className="text-red-500 font-mono tracking-wider">REINICIAR</strong>
                                </div>
                                <div className="flex flex-1 w-full gap-2">
                                    <input 
                                        type="text" 
                                        value={resetInput}
                                        onChange={e => setResetInput(e.target.value)}
                                        placeholder="REINICIAR"
                                        className="bg-stone-900 border border-red-800 text-red-100 px-3 py-1.5 rounded flex-1 outline-none focus:border-red-500 font-mono"
                                    />
                                    <button 
                                        onClick={handleResetCampaign} 
                                        disabled={resetInput !== 'REINICIAR'}
                                        className="px-4 py-1.5 bg-red-900 text-white rounded hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
                                    >
                                        Confirmar
                                    </button>
                                    <button 
                                        onClick={() => { setShowConfirmReset(false); setResetInput(''); }} 
                                        className="px-3 py-1.5 border border-stone-700 text-stone-400 rounded hover:bg-stone-800 transition-colors text-sm"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                 </section>

                 <section className="text-center pt-8 pb-4 text-xs text-stone-600">
                    <p className="font-display font-medium tracking-[0.2em] mb-1">ARKANUS: O CUSTO DA MAGIA</p>
                    <p>Powered by Vite, React, Tailwind & Firebase</p>
                    <p className="mt-2 text-stone-700 hover:text-stone-500 transition-colors">Um jogo focado em estratégia hermética territorial sazonal.</p>
                 </section>

             </div>
         </div>
      </div>
   );
};
