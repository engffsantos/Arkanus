import React, { useState } from 'react';
import { useGameState } from '../../context/GameContext';
import { Book, Feather } from 'lucide-react';

export const LibraryScreen: React.FC = () => {
  const { state, dispatch } = useGameState();
  const lib = state.library || { capacity: 50, books: [], transcriptionProjects: [], scribes: 0, binders: 0, illuminators: 0 };
  const books = lib.books || [];

  const [showWriteModal, setShowWriteModal] = useState(false);
  const [newBook, setNewBook] = useState({
     title: '',
     type: 'Tomo Maior',
     subject: 'Teoria Arcana'
  });

  // Qualidade Base = Comunicação + 3
  const mageComm = state.mage.communication || 0;
  const quality = mageComm + 3 + (lib.scribes ? 1 : 0) + (lib.binders ? 1 : 0) + (lib.illuminators ? 1 : 0);
  const level = newBook.type === 'Tomo Maior' ? mageComm * 2 + 5 : mageComm + 3;

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 pb-4 border-b border-arkanus-border">
        <div>
          <h2 className="font-display text-3xl text-arkanus-gold-light tracking-wide flex items-center gap-3">
             <Book className="w-8 h-8 text-amber-500" /> Biblioteca de {state.covenant?.name || 'Arkanus'}
          </h2>
          <p className="text-arkanus-text-dim mt-2 font-serif italic max-w-2xl">
            "A tinta de um estudioso é mais preciosa que o sangue de um mártir. Aqui descansa a sabedoria das eras."
          </p>
        </div>
        <div className="flex gap-4 shrink-0">
           <div className="bg-arkanus-panel border border-arkanus-border rounded p-3 text-center min-w-[100px]">
              <div className="text-xs text-arkanus-text-dim uppercase tracking-widest mb-1">Capacidade</div>
              <div className="font-display text-xl text-stone-300 font-bold">{books.length} / {lib.capacity}</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full min-h-0">
        <div className="col-span-12 md:col-span-3 flex flex-col gap-4">
           <div className="bg-[#0a0806] border border-arkanus-border rounded p-4 shadow-inner">
             <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500 mb-4 pb-2 border-b border-arkanus-border">Artesãos da Palavra</h3>
             <div className="space-y-3 text-sm">
               <div className="flex justify-between">
                 <span className="text-stone-400">Escribas</span>
                 <span className="text-stone-200">{lib.scribes}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-stone-400">Encadernadores</span>
                 <span className="text-stone-200">{lib.binders}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-stone-400">Iluminadores</span>
                 <span className="text-stone-200">{lib.illuminators}</span>
               </div>
             </div>
           </div>
           
           <button 
             onClick={() => setShowWriteModal(true)}
             disabled={!!state.meta.primaryAction}
             className="py-4 px-4 bg-arkanus-panel border border-arkanus-border hover:border-amber-500/50 rounded flex items-center justify-center gap-2 text-amber-300 transition-colors uppercase tracking-widest text-xs font-medium shadow-sm disabled:opacity-50 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)] group"
           >
             <Feather className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Escrever Texto (-50 Prata)
           </button>
        </div>

        <div className="col-span-12 md:col-span-9 bg-arkanus-panel border border-arkanus-border shadow-inner rounded p-6 overflow-y-auto custom-scrollbar flex flex-col relative">
           {books.length === 0 ? (
             <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
               <Book className="w-20 h-20 text-stone-600 mb-4" />
               <h3 className="font-display text-2xl text-stone-300 mb-2">Estantes Vazias</h3>
               <p className="text-stone-500 max-w-sm">A poeira cobre as prateleiras. Mande escrever ou copie textos para preencher sua biblioteca e garantir o avanço do conhecimento.</p>
             </div>
           ) : (
             <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-max">
               {books.map((book: any, idx: number) => (
                 <div key={idx} className="p-4 border border-stone-800 hover:border-amber-900/50 rounded bg-[#1a1511] flex items-start gap-4 transition-colors">
                    <Book className="w-8 h-8 text-amber-900 shrink-0" />
                    <div>
                      <h4 className="font-medium text-stone-200">{book.title}</h4>
                      <p className="text-xs text-stone-500 mt-1">{book.type} • {book.subject} • Nível {book.level} • Qualidade {book.quality}</p>
                    </div>
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>

       {showWriteModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
             <div className="bg-arkanus-panel border border-arkanus-border shadow-2xl rounded p-6 max-w-lg w-full relative">
                <h3 className="font-display text-2xl text-amber-300 mb-4 border-b border-arkanus-border pb-4">Escrita de Obra</h3>
                
                <p className="text-arkanus-text-dim text-sm italic mb-6">
                  Escrever uma obra consome uma ação sazonal e prata para recursos e artesãos.
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-arkanus-gold-light mb-1 block">Título da Obra</label>
                    <input 
                      type="text" 
                      value={newBook.title}
                      onChange={e => setNewBook({...newBook, title: e.target.value})}
                      className="w-full bg-[#0a0806] border border-arkanus-border rounded px-3 py-2 text-arkanus-text focus:outline-none focus:border-amber-500/50"
                      placeholder="Ex: Fundamentos de Creo"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-arkanus-gold-light mb-1 block">Tipo de Obra</label>
                      <select 
                         value={newBook.type}
                         onChange={e => setNewBook({...newBook, type: e.target.value})}
                         className="w-full bg-[#0a0806] border border-arkanus-border rounded px-3 py-2 text-arkanus-text focus:outline-none focus:border-amber-500/50 appearance-none"
                      >
                         <option value="Tomo Maior">Tomo Maior (Summa)</option>
                         <option value="Tratado Menor">Tratado Menor (Tractatus)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-arkanus-gold-light mb-1 block">Assunto</label>
                      <select 
                         value={newBook.subject}
                         onChange={e => setNewBook({...newBook, subject: e.target.value})}
                         className="w-full bg-[#0a0806] border border-arkanus-border rounded px-3 py-2 text-arkanus-text focus:outline-none focus:border-amber-500/50 appearance-none"
                      >
                         <optgroup label="Técnicas">
                            <option value="Creo">Creo</option>
                            <option value="Intellego">Intellego</option>
                            <option value="Muto">Muto</option>
                            <option value="Perdo">Perdo</option>
                            <option value="Rego">Rego</option>
                         </optgroup>
                         <optgroup label="Formas">
                            <option value="Ignem">Ignem</option>
                            <option value="Corpus">Corpus</option>
                            <option value="Mentem">Mentem</option>
                         </optgroup>
                         <optgroup label="Conhecimentos">
                            <option value="Teoria Arcana">Teoria Arcana</option>
                            <option value="Saber do Domínio">Saber do Domínio</option>
                         </optgroup>
                      </select>
                    </div>
                  </div>
                  
                  <div className="bg-amber-950/20 border border-amber-900/30 p-3 rounded mt-2">
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-amber-200/60 uppercase tracking-widest text-xs">Propriedades Previstas</span>
                     </div>
                     <div className="flex gap-4 mt-2 font-display text-lg text-amber-400">
                        <div>Nível {level}</div>
                        <div className="text-stone-600">•</div>
                        <div>Qualidade {quality}</div>
                     </div>
                  </div>
                </div>

                <div className="flex gap-4">
                   <button 
                     onClick={() => {
                       if (!newBook.title) return;
                       dispatch({
                         type: 'SELECT_PRIMARY_ACTION',
                         payload: {
                           id: 'library-write-' + Date.now(),
                           category: 'Biblioteca',
                           subAction: 'Escrever',
                           payload: {
                             type: 'LIBRARY_SCRIBE_BOOK',
                             book: {
                                id: Date.now().toString(),
                                title: newBook.title,
                                type: newBook.type,
                                subject: newBook.subject,
                                level,
                                quality,
                                author: state.mage.name,
                                language: 'Latim',
                                status: 'available'
                             },
                             description: `Obra "${newBook.title}" escrita e adicionada ao acervo.`,
                             cost: { prata: 50 },
                           }
                         }
                       });
                       setShowWriteModal(false);
                     }}
                     disabled={state.resources.prata < 50 || !newBook.title}
                     className="flex-1 py-2 rounded bg-amber-900 text-amber-100 uppercase tracking-widest text-xs hover:bg-amber-800 transition-colors disabled:opacity-50"
                   >
                     Escrever Obra (-50 Prata)
                   </button>
                   <button 
                     onClick={() => setShowWriteModal(false)}
                     className="flex-1 py-2 rounded bg-stone-800 text-stone-300 uppercase tracking-widest text-xs hover:bg-stone-700 transition-colors"
                   >
                     Cancelar
                   </button>
                </div>
             </div>
          </div>
       )}
    </div>
  );
};
