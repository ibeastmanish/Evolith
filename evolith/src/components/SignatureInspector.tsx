"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { X, ChevronRight, Dna } from 'lucide-react';

export default function SignatureInspector() {
  const { selectedEntity, setSelectedEntity } = useStore();

  return (
    <AnimatePresence>
      {selectedEntity && (
        <motion.div 
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute top-0 right-0 h-full w-[400px] bg-neutral-900/90 backdrop-blur-2xl border-l border-neutral-800 shadow-2xl overflow-y-auto z-10"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
                {selectedEntity.type === 'node' ? 'Technology Profile' : 'Knowledge Mutation'}
              </h2>
              <button onClick={() => setSelectedEntity(null)} className="text-neutral-500 hover:text-white transition-colors bg-neutral-800/50 hover:bg-neutral-800 p-1.5 rounded-full">
                <X size={16} />
              </button>
            </div>

            {selectedEntity.type === 'node' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{selectedEntity.data.id}</h1>
                </div>

                {selectedEntity.data.dna ? (
                  <div>
                    <h3 className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Dna size={14} className="text-blue-500" /> Knowledge DNA
                    </h3>
                    <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                       <pre className="text-xs text-neutral-400 font-mono overflow-x-auto whitespace-pre-wrap">
                        {JSON.stringify(selectedEntity.data.dna, null, 2)}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-neutral-500 italic">No detailed DNA found for this node. Expand neighbors to explore further.</p>
                )}
              </div>
            )}

            {selectedEntity.type === 'edge' && (
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 text-xl font-bold text-white mb-3 flex-wrap">
                    <span>{typeof selectedEntity.data.source === 'object' ? selectedEntity.data.source.id : selectedEntity.data.source}</span>
                    <ChevronRight size={18} className="text-neutral-600" />
                    <span>{typeof selectedEntity.data.target === 'object' ? selectedEntity.data.target.id : selectedEntity.data.target}</span>
                  </div>
                  <div className="inline-flex items-center text-xs font-mono bg-blue-950/30 text-blue-400 border border-blue-900/50 px-3 py-1 rounded-full">
                    {selectedEntity.data.type}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-500 block mb-1.5">Confidence</span>
                    <span className={`text-xl font-mono ${selectedEntity.data.confidence > 0.8 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {selectedEntity.data.confidence ? (selectedEntity.data.confidence * 100).toFixed(0) + '%' : 'N/A'}
                    </span>
                  </div>
                  <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-500 block mb-1.5">Strength</span>
                    <span className="text-xl font-mono text-blue-400">
                      {selectedEntity.data.strength ? (selectedEntity.data.strength * 100).toFixed(0) + '%' : 'N/A'}
                    </span>
                  </div>
                </div>

                {selectedEntity.data.mutations && (
                  <div>
                    <h3 className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-3">Mutations</h3>
                    <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 space-y-5">
                      {selectedEntity.data.mutations.added_concepts?.length > 0 && (
                        <div>
                          <span className="text-[11px] text-emerald-400 font-bold tracking-wider mb-2 block uppercase">Added</span>
                          <ul className="text-sm text-neutral-300 space-y-1.5">
                            {selectedEntity.data.mutations.added_concepts.map((m: string, i: number) => (
                              <li key={i} className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">+</span> {m}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {selectedEntity.data.mutations.removed_concepts?.length > 0 && (
                        <div>
                          <span className="text-[11px] text-red-400 font-bold tracking-wider mb-2 block uppercase">Removed</span>
                          <ul className="text-sm text-neutral-300 space-y-1.5">
                            {selectedEntity.data.mutations.removed_concepts.map((m: string, i: number) => (
                              <li key={i} className="flex items-start gap-2"><span className="text-red-500 mt-0.5">-</span> {m}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
