"use client";

import { useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";
import { useStore } from "@/store/useStore";
import { milestones } from "@/lib/mock-data";
import { nodeColors } from "@/lib/constants";

export default function TimeMachine() {
  const {
    currentYear,
    setCurrentYear,
    isPlaying,
    setIsPlaying,
    playbackSpeed,
    setPlaybackSpeed,
  } = useStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const minYear = 1940;
  const maxYear = 2026;
  const pixelsPerYear = 40; // Zoom level essentially

  /* ── Auto Playback ── */
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      if (!isPlaying) return;

      const delta = (time - lastTime) / 1000; // seconds
      lastTime = time;

      setCurrentYear((prev) => {
        const next = prev + delta * 2 * playbackSpeed;
        if (next >= maxYear) {
          setIsPlaying(false);
          return maxYear;
        }
        return next;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, playbackSpeed, setCurrentYear, setIsPlaying]);

  /* ── Sync scroll position with currentYear (when not dragging) ── */
  useEffect(() => {
    if (containerRef.current && !isDragging.current) {
      const targetScroll = (currentYear - minYear) * pixelsPerYear;
      const centerOffset = containerRef.current.clientWidth / 2;
      containerRef.current.scrollTo({
        left: targetScroll - centerOffset,
        behavior: isPlaying ? "auto" : "smooth",
      });
    }
  }, [currentYear, isPlaying]);

  /* ── Drag to Scrub ── */
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (containerRef.current?.offsetLeft || 0);
    scrollLeft.current = containerRef.current?.scrollLeft || 0;
    setIsPlaying(false); // Pause on drag
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag speed multiplier
    const newScroll = scrollLeft.current - walk;
    containerRef.current.scrollLeft = newScroll;

    // Map scroll position back to year
    const centerOffset = containerRef.current.clientWidth / 2;
    const year = minYear + (newScroll + centerOffset) / pixelsPerYear;
    setCurrentYear(Math.max(minYear, Math.min(maxYear, year)));
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  /* ── Generate Year Markers ── */
  const years = [];
  for (let y = minYear; y <= maxYear; y += 1) {
    years.push(y);
  }

  const roundedYear = Math.floor(currentYear);

  return (
    <div className="h-[120px] bg-[var(--ev-background)] border-t border-[var(--ev-border)] relative flex flex-col select-none">
      {/* Current Year Display */}
      <div className="absolute top-[-24px] left-1/2 -translate-x-1/2 px-4 py-1 ev-glass-strong rounded-full border border-[var(--ev-accent)] shadow-[var(--shadow-glow-accent)] z-20">
        <span
          className="text-lg font-bold text-[var(--ev-accent)]"
          style={{ fontFamily: "var(--font-numbers)" }}
        >
          {roundedYear}
        </span>
      </div>

      {/* Controls */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex items-center gap-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 rounded-full ev-glass hover:bg-[rgba(255,255,255,0.1)] flex items-center justify-center transition-colors shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-[var(--ev-border-hover)]"
        >
          {isPlaying ? (
            <Pause size={16} className="text-[var(--ev-text)]" />
          ) : (
            <Play size={16} className="text-[var(--ev-text)] ml-0.5" />
          )}
        </button>

        <div className="flex items-center bg-[var(--ev-surface)] rounded-full border border-[var(--ev-border)] overflow-hidden">
          {[1, 2, 4].map((speed) => (
            <button
              key={speed}
              onClick={() => setPlaybackSpeed(speed)}
              className={`px-2.5 py-1 text-[10px] font-medium transition-colors ${
                playbackSpeed === speed
                  ? "bg-[var(--ev-accent)] text-white"
                  : "text-[var(--ev-text-muted)] hover:text-[var(--ev-text)] hover:bg-[var(--ev-elevated)]"
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Track */}
      <div
        ref={containerRef}
        className="flex-1 overflow-x-hidden relative cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 h-px bg-[var(--ev-border-hover)]"
          style={{ left: 0, right: 0 }}
        />

        <div
          className="h-full relative pointer-events-none"
          style={{ width: `${(maxYear - minYear + 20) * pixelsPerYear}px` }}
        >
          {/* Central Indicator Line */}
          <div
            className="fixed top-0 bottom-0 w-px bg-[var(--ev-accent)] left-1/2 -translate-x-1/2 z-10 shadow-[var(--shadow-glow-accent)]"
            style={{ height: "120px" }}
          />

          {years.map((year) => {
            const isDecade = year % 10 === 0;
            const x = (year - minYear) * pixelsPerYear;
            const ms = milestones.filter((m) => m.year === year);

            return (
              <div
                key={year}
                className="absolute top-0 bottom-0 flex flex-col justify-center items-center"
                style={{ left: `${x}px`, width: "2px" }}
              >
                <div
                  className={`w-px bg-[var(--ev-border-hover)] ${
                    isDecade ? "h-6" : "h-3"
                  }`}
                />
                {(isDecade || year === roundedYear) && (
                  <span
                    className={`absolute bottom-3 text-[10px] font-medium ${
                      year === roundedYear
                        ? "text-[var(--ev-accent)]"
                        : "text-[var(--ev-text-muted)]"
                    }`}
                    style={{ fontFamily: "var(--font-numbers)" }}
                  >
                    {year}
                  </span>
                )}

                {/* Milestones */}
                {ms.map((m, i) => {
                  const color = nodeColors[m.type] || "var(--ev-text-muted)";
                  const isMajor = m.significance === "major";
                  return (
                    <div
                      key={m.nodeId}
                      className={`absolute rounded-full border border-[var(--ev-background)] group pointer-events-auto cursor-pointer flex items-center justify-center`}
                      style={{
                        top: "30%",
                        marginTop: `${i * -12}px`,
                        width: isMajor ? "14px" : "10px",
                        height: isMajor ? "14px" : "10px",
                        background: color,
                        boxShadow: `0 0 ${isMajor ? "12px" : "6px"} ${color}60`,
                        transform: "translateX(-50%)",
                      }}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ev-glass-strong px-3 py-1.5 rounded-[8px] border border-[var(--ev-border)] pointer-events-none z-50">
                        <div className="text-[11px] font-medium text-[var(--ev-text)]">
                          {m.label}
                        </div>
                        <div className="text-[9px] text-[var(--ev-text-muted)] mt-0.5 uppercase tracking-wider">
                          {m.year} · {m.type}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
