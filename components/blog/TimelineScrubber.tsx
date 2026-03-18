"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

const phases = [
  {
    id: 1,
    label: "Human-Only Internet",
    years: "1990s–2010s",
    startPct: 0,
    endPct: 33.33,
    color: "rgba(255, 255, 255, 0.9)",
    accent: "rgba(255, 255, 255, 0.6)",
  },
  {
    id: 2,
    label: "Hybrid Mode",
    years: "2024–2026",
    startPct: 33.33,
    endPct: 66.66,
    color: "#C8B8E8",
    accent: "rgba(200, 184, 232, 0.6)",
  },
  {
    id: 3,
    label: "Dual-Mode Internet",
    years: "2027+",
    startPct: 66.66,
    endPct: 100,
    color: "#93c5fd",
    accent: "rgba(147, 197, 253, 0.6)",
  },
] as const;

function getActivePhase(pct: number): number {
  if (pct < 33.33) return 0;
  if (pct < 66.66) return 1;
  return 2;
}

const styleId = "timeline-scrubber-keyframes";

function injectStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(styleId)) return;
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    @keyframes ts-pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.4); opacity: 0.5; }
    }
    @keyframes ts-pulse-text {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
  `;
  document.head.appendChild(style);
}

export default function TimelineScrubber() {
  const [pct, setPct] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const autoPlay = useRef(true);
  const rafId = useRef<number>(0);

  useEffect(() => {
    injectStyles();
  }, []);

  // Auto-step through three phases
  useEffect(() => {
    const stops = [16, 50, 83]; // center of each phase
    const stepRef = { current: 0 };
    const delay = 2500; // ms per step

    const advance = () => {
      if (!autoPlay.current) return;
      setPct(stops[stepRef.current]);
      stepRef.current = (stepRef.current + 1) % stops.length;
      rafId.current = window.setTimeout(advance, delay) as unknown as number;
    };

    rafId.current = window.setTimeout(advance, 500) as unknown as number;
    return () => clearTimeout(rafId.current);
  }, []);

  const updateFromClient = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.max(0, Math.min(100, raw)));
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      autoPlay.current = false;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updateFromClient(e.clientX);
    },
    [updateFromClient]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      updateFromClient(e.clientX);
    },
    [updateFromClient]
  );

  const onPointerUp = useCallback(() => {
    dragging.current = false;
    // Resume auto-play after 3 seconds of inactivity
    setTimeout(() => {
      if (!dragging.current) {
        autoPlay.current = true;
      }
    }, 3000);
  }, []);

  const activeIdx = getActivePhase(pct);
  const phase = phases[activeIdx];
  const youAreHerePct = 50;

  return (
    <div
      style={{
        margin: "2rem 0",
        background: "rgba(255, 255, 255, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        borderRadius: 16,
        padding: "28px 24px 20px",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      {/* Phase label */}
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <span
          style={{
            display: "inline-block",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: phase.color,
            background: "rgba(255, 255, 255, 0.1)",
            padding: "4px 16px",
            borderRadius: 999,
            border: `1px solid ${phase.accent}`,
          }}
        >
          {phase.label}
        </span>
        <div
          style={{
            fontSize: 13,
            color: "rgba(255, 255, 255, 0.7)",
            marginTop: 6,
          }}
        >
          {phase.years}
        </div>
      </div>

      {/* Phase description cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
          marginBottom: 24,
        }}
      >
        {phases.map((p, i) => (
          <div
            key={p.id}
            style={{
              padding: "14px 12px",
              borderRadius: 10,
              background:
                activeIdx === i
                  ? "rgba(255, 255, 255, 0.12)"
                  : "rgba(255, 255, 255, 0.04)",
              border:
                activeIdx === i
                  ? `1px solid ${p.accent}`
                  : "1px solid rgba(255, 255, 255, 0.08)",
              transition: "all 0.3s ease",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color:
                  activeIdx === i ? p.color : "rgba(255, 255, 255, 0.6)",
                marginBottom: 4,
                transition: "color 0.3s ease",
              }}
            >
              Phase {p.id}
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: activeIdx === i ? 600 : 400,
                color:
                  activeIdx === i
                    ? "rgba(255, 255, 255, 0.95)"
                    : "rgba(255, 255, 255, 0.65)",
                lineHeight: 1.3,
                transition: "all 0.3s ease",
              }}
            >
              {p.label}
            </div>
            <div
              style={{
                fontSize: 11,
                color:
                  activeIdx === i
                    ? "rgba(255, 255, 255, 0.6)"
                    : "rgba(255, 255, 255, 0.55)",
                marginTop: 2,
                transition: "color 0.3s ease",
              }}
            >
              {p.years}
            </div>
          </div>
        ))}
      </div>

      {/* Timeline track */}
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{
          position: "relative",
          height: 48,
          cursor: "pointer",
          touchAction: "none",
        }}
      >
        {/* Track background */}
        <div
          style={{
            position: "absolute",
            top: 18,
            left: 0,
            right: 0,
            height: 6,
            borderRadius: 3,
            overflow: "hidden",
            display: "flex",
          }}
        >
          {phases.map((p) => (
            <div
              key={p.id}
              style={{
                flex: 1,
                background: "rgba(255, 255, 255, 0.15)",
              }}
            />
          ))}
        </div>

        {/* Filled portion */}
        <div
          style={{
            position: "absolute",
            top: 18,
            left: 0,
            width: `${pct}%`,
            height: 6,
            borderRadius: 3,
            background: phase.color,
            transition: dragging.current ? "none" : "width 0.8s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease",
          }}
        />

        {/* Phase dividers */}
        {[33.33, 66.66].map((pos) => (
          <div
            key={pos}
            style={{
              position: "absolute",
              left: `${pos}%`,
              top: 14,
              width: 2,
              height: 14,
              background: "rgba(255, 255, 255, 0.3)",
              borderRadius: 1,
              transform: "translateX(-1px)",
            }}
          />
        ))}

        {/* "YOU ARE HERE" pulsing marker */}
        <div
          style={{
            position: "absolute",
            left: `${youAreHerePct}%`,
            top: -2,
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontSize: 8,
              fontWeight: 800,
              color: "#fbbf24",
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
              animation: "ts-pulse-text 2s ease-in-out infinite",
            }}
          >
            YOU ARE HERE
          </span>
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#fbbf24",
              marginTop: 2,
              animation: "ts-pulse 2s ease-in-out infinite",
            }}
          />
        </div>

        {/* Draggable handle */}
        <div
          style={{
            position: "absolute",
            left: `${pct}%`,
            top: 10,
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: `2px solid ${phase.color}`,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            transform: "translateX(-50%)",
            transition: dragging.current
              ? "none"
              : "left 0.8s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease",
            zIndex: 10,
          }}
        />

        {/* Year labels */}
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 10,
            color: "rgba(255, 255, 255, 0.65)",
            fontWeight: 500,
            padding: "0 2px",
          }}
        >
          <span>1990s</span>
          <span
            style={{
              position: "absolute",
              left: "33.33%",
              transform: "translateX(-50%)",
            }}
          >
            2024
          </span>
          <span
            style={{
              position: "absolute",
              left: "66.66%",
              transform: "translateX(-50%)",
            }}
          >
            2027
          </span>
          <span>Future</span>
        </div>
      </div>
    </div>
  );
}
