"use client";

import { useState, useRef, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  mode: "research" | "discovery";
  explainability?: {
    sources: string[];
    reasoning_summary: string;
    confidence: number;
    alternative_interpretations: string[];
    limitations: string[];
    verification_status: "verified" | "partially_verified" | "unverified";
  };
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"research" | "discovery">("research");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
      mode,
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          mode: mode
        })
      });
      
      if (!res.ok) throw new Error("Failed to fetch response");
      
      const data = await res.json();
      
      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.answer,
        mode: data.mode,
        explainability: data.explainability,
      };
      
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, I encountered an error communicating with the backend. Is the server running?",
        mode,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[var(--ag-border)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-[family-name:var(--font-heading)] font-semibold text-[var(--ag-text-primary)]">
            AI Assistant
          </h1>
          <Badge variant={mode === "research" ? "research" : "discovery"}>
            {mode === "research" ? "Research Mode" : "Discovery Mode"}
          </Badge>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center gap-1 p-1 rounded-[10px] bg-[var(--ag-surface-elevated)] border border-[var(--ag-border)]">
          <button
            onClick={() => setMode("research")}
            className={`px-3 py-1.5 rounded-[8px] text-xs font-medium transition-all ${
              mode === "research"
                ? "bg-[var(--ag-research)] bg-opacity-15 text-[var(--ag-research)]"
                : "text-[var(--ag-text-muted)] hover:text-[var(--ag-text-secondary)]"
            }`}
          >
            Research
          </button>
          <button
            onClick={() => setMode("discovery")}
            className={`px-3 py-1.5 rounded-[8px] text-xs font-medium transition-all ${
              mode === "discovery"
                ? "bg-[var(--ag-discovery)] bg-opacity-15 text-[var(--ag-discovery)]"
                : "text-[var(--ag-text-muted)] hover:text-[var(--ag-text-secondary)]"
            }`}
          >
            Discovery
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md">
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h2 className="text-base font-[family-name:var(--font-heading)] font-semibold text-[var(--ag-text-primary)] mb-2">
                {mode === "research" ? "Research Mode" : "Discovery Mode"}
              </h2>
              <p className="text-sm text-[var(--ag-text-tertiary)]">
                {mode === "research"
                  ? "Ask questions grounded in existing literature. Every claim requires ≥0.7 confidence and citations."
                  : "Explore speculative connections. Ideas are clearly labeled as exploratory with visible confidence levels."}
              </p>
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-2xl ${msg.role === "user" ? "ml-16" : "mr-16"}`}>
              {/* Mode badge for AI messages */}
              {msg.role === "assistant" && (
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={msg.mode === "research" ? "research" : "discovery"}>
                    {msg.mode === "research" ? "Research" : "Discovery"}
                  </Badge>
                </div>
              )}
              
              <Card
                variant={msg.role === "user" ? "elevated" : "default"}
                padding="md"
              >
                <p className="text-sm text-[var(--ag-text-primary)] leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>
              </Card>

              {/* Explainability panel */}
              {msg.explainability && (
                <div className="mt-2 p-4 rounded-[12px] bg-[var(--ag-surface)] border border-[var(--ag-border)] space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[var(--ag-text-muted)]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
                    </svg>
                    Explainability
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[var(--ag-text-tertiary)]">Confidence:</span>
                    <div className="flex-1 h-1.5 rounded-full bg-[var(--ag-surface-elevated)] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--ag-accent)]"
                        style={{ width: `${msg.explainability.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-[var(--ag-text-muted)]">
                      {(msg.explainability.confidence * 100).toFixed(0)}%
                    </span>
                  </div>

                  {msg.explainability.reasoning_summary && (
                    <p className="text-xs text-[var(--ag-text-tertiary)]">
                      {msg.explainability.reasoning_summary}
                    </p>
                  )}

                  {msg.explainability.limitations.length > 0 && (
                    <div>
                      <span className="text-xs text-[var(--ag-text-muted)]">Limitations:</span>
                      <ul className="mt-1 space-y-1">
                        {msg.explainability.limitations.map((lim, i) => (
                          <li key={i} className="text-xs text-[var(--ag-text-tertiary)] flex items-start gap-1.5">
                            <span className="text-[var(--ag-warning)] mt-0.5">•</span>
                            {lim}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Badge variant={
                    msg.explainability.verification_status === "verified" ? "verified" :
                    msg.explainability.verification_status === "partially_verified" ? "unverified" :
                    "contradicted"
                  }>
                    {msg.explainability.verification_status.replace("_", " ")}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <Card variant="default" padding="md" className="max-w-2xl">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-[var(--ag-accent)] animate-pulse" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-[var(--ag-accent)] animate-pulse" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-[var(--ag-accent)] animate-pulse" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-xs text-[var(--ag-text-muted)]">
                  {mode === "research" ? "Retrieving evidence…" : "Exploring connections…"}
                </span>
              </div>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[var(--ag-border)]">
        <div className="flex gap-3 max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder={mode === "research"
              ? "Ask about established physics…"
              : "Explore speculative connections…"
            }
            className="flex-1 px-4 py-3 rounded-[12px] bg-[var(--ag-surface)] border border-[var(--ag-border)] text-sm text-[var(--ag-text-primary)] placeholder:text-[var(--ag-text-muted)] focus:outline-none focus:border-[var(--ag-accent)] transition-colors"
          />
          <Button variant="accent" onClick={handleSend} disabled={isLoading || !input.trim()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
