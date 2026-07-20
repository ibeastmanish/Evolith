"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Brain, Sparkles, Plus, ArrowRight, X } from "lucide-react";
import { useStore } from "@/store/useStore";
import type { KnowledgeNode } from "@/lib/mock-data";

interface ResearchPartnerProps {
  topicNode: KnowledgeNode;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  actions?: { label: string; action: () => void }[];
}

export default function ResearchPartner({ topicNode }: ResearchPartnerProps) {
  const { togglePartner, setSelectedNodeId } = useStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      content: `I've initialized the workspace for **${topicNode.label}**. I can help you analyze the evolutionary graph, find key papers, or compare it with parallel technologies. What would you like to investigate?`,
      timestamp: new Date(),
      actions: [
        { label: "Find origin paper", action: () => setSelectedNodeId("attention-paper") },
        { label: "Show key contributors", action: () => {} },
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Mock response
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Based on the graph topology, this innovation heavily cited earlier work in recurrent architectures before diverging. I've highlighted the structural shift in the Knowledge Universe.",
          timestamp: new Date(),
          actions: [
            { label: "View evolution tree", action: () => {} },
          ],
        },
      ]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-[var(--ev-background)]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--ev-border)]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[10px] ev-gradient-accent flex items-center justify-center shadow-[var(--shadow-glow-accent)]">
            <Brain size={16} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--ev-text)]">Research Partner</h3>
            <div className="flex items-center gap-1.5 text-[10px] text-[var(--ev-accent)] mt-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--ev-accent)] opacity-40"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--ev-accent)]"></span>
              </span>
              Context Active
            </div>
          </div>
        </div>
        <button
          onClick={togglePartner}
          className="p-1.5 rounded-lg text-[var(--ev-text-muted)] hover:text-[var(--ev-text)] hover:bg-[var(--ev-surface)] transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-5 scrollbar-hide">
        <div className="flex flex-col gap-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-[14px] px-4 py-3 text-[13px] leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[var(--ev-surface)] text-[var(--ev-text)] border border-[var(--ev-border)]"
                    : "ev-glass-subtle text-[var(--ev-text-secondary)]"
                }`}
              >
                {/* Simple bold parsing for mock */}
                {msg.content.split(/(\*\*.*?\*\*)/).map((part, i) =>
                  part.startsWith("**") && part.endsWith("**") ? (
                    <strong key={i} className="text-[var(--ev-text)] font-semibold">
                      {part.slice(2, -2)}
                    </strong>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </div>

              {/* Action Pills */}
              {msg.actions && msg.actions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 ml-2">
                  {msg.actions.map((act, i) => (
                    <button
                      key={i}
                      onClick={act.action}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-[var(--ev-accent)] bg-[var(--ev-accent-muted)] border border-[var(--ev-border)] hover:border-[var(--ev-accent)] transition-all duration-[120ms] hover:-translate-y-[1px]"
                    >
                      <Sparkles size={10} />
                      {act.label}
                      <ArrowRight size={10} className="opacity-50" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start">
              <div className="ev-glass-subtle rounded-[14px] px-4 py-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--ev-text-muted)] animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--ev-text-muted)] animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--ev-text-muted)] animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-[var(--ev-border)]">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about connections, papers..."
            className="w-full bg-[var(--ev-surface)] border border-[var(--ev-border)] rounded-[14px] pl-4 pr-10 py-3 text-[13px] text-[var(--ev-text)] placeholder-[var(--ev-text-muted)] focus:outline-none focus:border-[var(--ev-border-active)] focus:shadow-[0_0_0_1px_var(--ev-border-active)] transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-[10px] flex items-center justify-center text-[var(--ev-text-muted)] hover:text-[var(--ev-accent)] hover:bg-[var(--ev-accent-muted)] disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[var(--ev-text-muted)] transition-colors"
          >
            <Send size={14} />
          </button>
        </form>

        <div className="flex items-center justify-between mt-3 px-1">
          <button
            type="button"
            className="flex items-center gap-1 text-[10px] font-medium text-[var(--ev-text-muted)] hover:text-[var(--ev-text-secondary)] transition-colors"
          >
            <Plus size={12} />
            Add Context
          </button>
          <div className="text-[9px] text-[var(--ev-text-tertiary)]">
            Powered by Evolith AI
          </div>
        </div>
      </div>
    </div>
  );
}
