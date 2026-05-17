import React from 'react';
import { Beaker as Flask, BookOpen, ScrollText, Droplet, Lock } from 'lucide-react';

export const LabPanel: React.FC = () => {
  return (
    <div className="bg-arkanus-panel border border-arkanus-border flex flex-col rounded shadow-lg overflow-hidden h-full">
      <div className="py-2 border-b border-arkanus-border text-center bg-gradient-to-b from-arkanus-panel-light to-transparent">
        <h2 className="font-display text-lg text-arkanus-blue tracking-[0.2em] uppercase flex items-center justify-center gap-2">
          Laboratório <Flask className="w-4 h-4 text-arkanus-blue opacity-70" />
        </h2>
      </div>
      
      <div className="p-4 flex flex-col gap-4">
         
         {/* Lab Header Graphic */}
         <div className="w-full h-[100px] border border-arkanus-border rounded overflow-hidden relative shadow-[0_4px_10px_rgba(0,0,0,0.5)] group">
             <img 
               src="https://images.unsplash.com/photo-1603811467439-0d1706691ce2?auto=format&fit=crop&w=500&q=80" 
               alt="Laboratório" 
               className="w-full h-full object-cover filter sepia-[0.3] contrast-125 brightness-75 group-hover:scale-105 transition-transform duration-[8s] ease-out" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-arkanus-panel via-transparent to-transparent opacity-90"></div>
         </div>

         <LabItem 
            icon={<ScrollText className="w-5 h-5 text-amber-300" />}
            title="Pesquisa"
            subtitle="Rituais de Purificação"
            progress={62}
            progressStr="62%"
            color="bg-blue-600"
         />

         <div className="py-3 border-y border-arkanus-border">
            <div className="flex justify-between items-center mb-2">
               <div className="flex gap-2 items-center">
                  <Flask className="w-5 h-5 text-purple-400" />
                  <div className="flex flex-col">
                     <span className="text-xs uppercase tracking-wider text-arkanus-gold-light font-medium">Itens</span>
                     <span className="text-[10px] text-arkanus-text-dim">3 em produção</span>
                  </div>
               </div>
               <div className="flex gap-1.5">
                  <Potion icon={<Droplet className="text-blue-400 fill-blue-500 w-3 h-3" />} />
                  <Potion icon={<Droplet className="text-purple-400 fill-purple-500 w-3 h-3" />} />
                  <Potion icon={<Droplet className="text-red-400 fill-red-500 w-3 h-3" />} />
                  <div className="w-6 h-6 rounded-full border border-stone-700 bg-stone-900 flex items-center justify-center opacity-50">
                    <Lock className="w-3 h-3 text-stone-500" />
                  </div>
               </div>
            </div>
         </div>

         <LabItem 
            icon={<BookOpen className="w-5 h-5 text-stone-300" />}
            title="Biblioteca"
            subtitle="137 / 250 tomos"
            progress={55}
            progressStr="55%"
            color="bg-green-600"
         />

      </div>
    </div>
  );
};

const Potion = ({ icon }: any) => (
  <div className="w-7 h-7 rounded-full border border-stone-600 bg-gradient-to-b from-stone-800 to-stone-950 flex items-center justify-center shadow-inner relative overflow-hidden">
     <div className="absolute inset-x-0 top-0 h-1/2 bg-white/5"></div>
     {icon}
  </div>
);

const LabItem = ({ icon, title, subtitle, progress, progressStr, color }: any) => (
  <div className="flex items-center gap-3">
    {icon}
    <div className="flex-1 flex flex-col font-sans">
       <span className="text-xs uppercase tracking-wider text-arkanus-gold-light font-medium">{title}</span>
       <span className="text-[10px] text-arkanus-text-dim mb-1">{subtitle}</span>
       <div className="w-full bg-stone-900 rounded-full h-1.5 border border-stone-700 overflow-hidden flex">
          <div className={`h-full ${color}`} style={{ width: `${progress}%` }}></div>
       </div>
    </div>
    <span className="text-xs font-serif text-arkanus-text min-w-[32px] text-right">{progressStr}</span>
  </div>
);
