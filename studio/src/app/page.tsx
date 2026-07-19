"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Check, X, Shield, FileText, Activity, Database, ChevronRight } from "lucide-react";

type Candidate = {
  id: string;
  source_node: string;
  target_node: string;
  relationship_type: string;
  knowledge_dna: Record<string, unknown>;
  mutation: Record<string, unknown>;
  confidence: number;
  strength: number;
  evidence: string[];
  provenance: Record<string, unknown>;
  status: string;
};

export default function ValidationDashboard() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: candidates, isLoading, error, isError } = useQuery<Candidate[]>({
    queryKey: ["reviewQueue"],
    queryFn: async () => {
      const res = await fetch("http://127.0.0.1:8000/api/review/queue");
      if (!res.ok) throw new Error(`Failed to fetch queue: ${res.statusText}`);
      return res.json();
    },
  });

  const selectedCandidate = candidates?.find((c) => c.id === selectedId) || candidates?.[0];

  if (isLoading) {
    return <div className="p-8 text-zinc-500">Loading candidates...</div>;
  }
  
  if (isError) {
    return (
      <div className="p-8 text-red-500">
        <h2 className="font-semibold text-lg">Error loading candidates</h2>
        <p>{error?.message}</p>
        <p className="text-sm mt-2 text-zinc-400">Check if the backend is running and CORS is configured.</p>
      </div>
    );
  }

  if (!candidates || candidates.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-zinc-200">
          <Shield className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-zinc-900">Queue Empty</h2>
          <p className="text-zinc-500">All candidate relationships have been reviewed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-zinc-50 font-sans text-sm">
      {/* Sidebar - Queue */}
      <div className="w-80 border-r border-zinc-200 bg-white overflow-y-auto">
        <div className="p-4 border-b border-zinc-200 sticky top-0 bg-white/80 backdrop-blur-sm">
          <h2 className="font-semibold text-zinc-900 flex items-center gap-2">
            <Database className="w-4 h-4 text-zinc-500" />
            Pending Validation
            <span className="ml-auto bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full text-xs font-medium">
              {candidates.length}
            </span>
          </h2>
        </div>
        <div className="divide-y divide-zinc-100">
          {candidates.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className={`w-full text-left p-4 hover:bg-zinc-50 transition-colors ${
                selectedCandidate?.id === c.id ? "bg-zinc-50 border-l-2 border-l-black" : "border-l-2 border-l-transparent"
              }`}
            >
              <div className="font-medium text-zinc-900 truncate">{c.source_node}</div>
              <div className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                <ChevronRight className="w-3 h-3" /> {c.relationship_type}
              </div>
              <div className="text-xs font-mono text-zinc-400 truncate mt-1">{c.target_node}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content - Validation */}
      {selectedCandidate && (
        <ValidationPanel candidate={selectedCandidate} />
      )}
    </div>
  );
}

function ValidationPanel({ candidate }: { candidate: Candidate }) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    is_correct: true,
    is_meaningful: true,
    is_evidence_sufficient: true,
    would_agree: true,
    is_golden: false,
  });

  const validateMutation = useMutation({
    mutationFn: async (status: "approved" | "rejected") => {
      const res = await fetch(`http://localhost:8000/api/review/${candidate.id}/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, status }),
      });
      if (!res.ok) throw new Error("Failed to validate");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviewQueue"] });
      setFormData({
        is_correct: true,
        is_meaningful: true,
        is_evidence_sufficient: true,
        would_agree: true,
        is_golden: false,
      });
    },
  });

  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-black text-white rounded-full text-xs font-medium">Candidate</span>
              <span className="text-xs font-mono text-zinc-500">ID: {candidate.id.split('-')[0]}...</span>
              <div className="ml-auto flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                <Activity className="w-3 h-3" />
                Conf: {(candidate.confidence * 100).toFixed(0)}%
              </div>
            </div>
            <div className="flex items-center gap-3 text-lg font-medium text-zinc-900 mb-2">
              <span>{candidate.source_node}</span>
              <ChevronRight className="text-zinc-300" />
              <span className="text-zinc-500 font-normal text-sm px-2 py-1 bg-zinc-100 rounded">{candidate.relationship_type}</span>
              <ChevronRight className="text-zinc-300" />
              <span>{candidate.target_node}</span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-zinc-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-zinc-500" /> Evidence
              </h3>
              <ul className="space-y-3">
                {candidate.evidence?.map((ev, i) => (
                  <li key={i} className="text-xs leading-relaxed text-zinc-600 bg-white p-4 rounded-lg border border-zinc-200">
                    &quot;{ev}&quot;
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-zinc-900 mb-3">Knowledge DNA</h3>
                <pre className="text-xs bg-zinc-900 text-zinc-100 p-4 rounded-lg overflow-x-auto">
                  {JSON.stringify(candidate.knowledge_dna, null, 2)}
                </pre>
              </div>
              
              {candidate.mutation && (
                <div>
                  <h3 className="font-semibold text-zinc-900 mb-3">Mutation</h3>
                  <pre className="text-xs bg-white text-zinc-600 p-4 rounded-lg border border-zinc-200 overflow-x-auto">
                    {JSON.stringify(candidate.mutation, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Action Sidebar */}
      <div className="w-80 bg-white border-l border-zinc-200 flex flex-col">
        <div className="p-6 flex-1 overflow-y-auto">
          <h3 className="font-semibold text-zinc-900 mb-6">Validation Checklist</h3>
          
          <div className="space-y-4">
            <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 cursor-pointer transition-colors border border-transparent hover:border-zinc-200">
              <input type="checkbox" checked={formData.is_correct} onChange={(e) => setFormData({...formData, is_correct: e.target.checked})} className="mt-1" />
              <div>
                <div className="font-medium text-zinc-900">Relationship is correct</div>
                <div className="text-xs text-zinc-500">The edge accurately represents the reality.</div>
              </div>
            </label>
            
            <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 cursor-pointer transition-colors border border-transparent hover:border-zinc-200">
              <input type="checkbox" checked={formData.is_meaningful} onChange={(e) => setFormData({...formData, is_meaningful: e.target.checked})} className="mt-1" />
              <div>
                <div className="font-medium text-zinc-900">Mutation is meaningful</div>
                <div className="text-xs text-zinc-500">The architectural changes are well-described.</div>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 cursor-pointer transition-colors border border-transparent hover:border-zinc-200">
              <input type="checkbox" checked={formData.is_evidence_sufficient} onChange={(e) => setFormData({...formData, is_evidence_sufficient: e.target.checked})} className="mt-1" />
              <div>
                <div className="font-medium text-zinc-900">Evidence is sufficient</div>
                <div className="text-xs text-zinc-500">The quotes back up the relationship.</div>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 cursor-pointer transition-colors border border-transparent hover:border-zinc-200">
              <input type="checkbox" checked={formData.would_agree} onChange={(e) => setFormData({...formData, would_agree: e.target.checked})} className="mt-1" />
              <div>
                <div className="font-medium text-zinc-900">Human Agreement</div>
                <div className="text-xs text-zinc-500">Would another engineer agree?</div>
              </div>
            </label>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-200">
            <label className="flex items-center gap-3 p-4 bg-amber-50 text-amber-900 rounded-lg cursor-pointer border border-amber-200/50 hover:bg-amber-100 transition-colors">
              <input type="checkbox" checked={formData.is_golden} onChange={(e) => setFormData({...formData, is_golden: e.target.checked})} />
              <div className="font-medium text-sm">Add to Golden Dataset</div>
            </label>
            <p className="text-xs text-zinc-500 mt-2 px-1">Marking this as golden will use it as a benchmark for regression testing.</p>
          </div>
        </div>

        <div className="p-4 border-t border-zinc-200 flex gap-3 bg-zinc-50">
          <button
            onClick={() => validateMutation.mutate("rejected")}
            disabled={validateMutation.isPending}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white text-zinc-700 border border-zinc-300 rounded-lg hover:bg-zinc-50 font-medium transition-colors"
          >
            <X className="w-4 h-4" /> Reject
          </button>
          <button
            onClick={() => validateMutation.mutate("approved")}
            disabled={validateMutation.isPending}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 font-medium transition-colors"
          >
            <Check className="w-4 h-4" /> Approve
          </button>
        </div>
      </div>
    </div>
  );
}
