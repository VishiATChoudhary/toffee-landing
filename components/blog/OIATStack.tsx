"use client";

import React, { useEffect, useRef, useState } from "react";

interface Layer {
  id: string;
  name: string;
  description: string;
  color: string;
  borderColor: string;
}

const layers: Layer[] = [
  {
    id: "observability",
    name: "Observability",
    description: "See which agents visit and what they do",
    color: "#EDE9F5",
    borderColor: "#8B5FBF",
  },
  {
    id: "integration",
    name: "Integration",
    description: "Structured protocols for agent-server communication",
    color: "#EDE9F5",
    borderColor: "#8B5FBF",
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "New metrics for agent conversion funnels",
    color: "#EDE9F5",
    borderColor: "#8B5FBF",
  },
  {
    id: "trust",
    name: "Trust & Identity",
    description: "Distinguish legitimate agents from malicious bots",
    color: "#EDE9F5",
    borderColor: "#8B5FBF",
  },
];

/* ---------- Mini animated icons per layer ---------- */

function ObservabilityIcon() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, height: 28 }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: "#8B5FBF",
            animation: `oiatDotFlow 1.2s ease-in-out ${i * 0.25}s infinite`,
          }}
        />
      ))}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#8B5FBF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ animation: "oiatFadeInOut 1.6s ease-in-out infinite" }}
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </div>
  );
}

function IntegrationIcon() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, height: 28 }}>
      <span
        style={{
          display: "inline-block",
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#8B5FBF",
        }}
      />
      <svg
        width="32"
        height="18"
        viewBox="0 0 32 18"
        fill="none"
        style={{ overflow: "visible" }}
      >
        <line
          x1="0"
          y1="9"
          x2="14"
          y2="9"
          stroke="#8B5FBF"
          strokeWidth="2"
          strokeDasharray="4 3"
          style={{ animation: "oiatDash 0.8s linear infinite" }}
        />
        <polygon
          points="14,5 20,9 14,13"
          fill="#8B5FBF"
          style={{ animation: "oiatArrowRight 1s ease-in-out infinite" }}
        />
        <polygon
          points="18,5 12,9 18,13"
          fill="#8B5FBF"
          style={{ animation: "oiatArrowLeft 1s ease-in-out infinite" }}
        />
        <line
          x1="18"
          y1="9"
          x2="32"
          y2="9"
          stroke="#8B5FBF"
          strokeWidth="2"
          strokeDasharray="4 3"
          style={{ animation: "oiatDash 0.8s linear infinite reverse" }}
        />
      </svg>
      <span
        style={{
          display: "inline-block",
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#8B5FBF",
        }}
      />
    </div>
  );
}

function AnalyticsIcon() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 28 }}>
      {[10, 18, 14, 24].map((h, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: 6,
            borderRadius: 2,
            backgroundColor: "#8B5FBF",
            animation: `oiatBarGrow 1.4s ease-out ${i * 0.15}s infinite`,
            transformOrigin: "bottom",
            height: h,
          }}
        />
      ))}
    </div>
  );
}

function TrustIcon() {
  return (
    <div style={{ position: "relative", width: 26, height: 28 }}>
      <svg
        width="26"
        height="28"
        viewBox="0 0 26 28"
        fill="none"
        stroke="#8B5FBF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2L3 7v6c0 6.5 4.3 12.2 10 14 5.7-1.8 10-7.5 10-14V7L13 2z" />
        <polyline
          points="8,14 12,18 18,10"
          stroke="#8B5FBF"
          strokeWidth="2.5"
          fill="none"
          style={{
            strokeDasharray: 20,
            strokeDashoffset: 20,
            animation: "oiatCheckDraw 1s ease-out 0.3s forwards infinite",
          }}
        />
      </svg>
    </div>
  );
}

const iconMap: Record<string, React.FC> = {
  observability: ObservabilityIcon,
  integration: IntegrationIcon,
  analytics: AnalyticsIcon,
  trust: TrustIcon,
};

/* ---------- Keyframe styles (injected once) ---------- */

const keyframes = `
@keyframes oiatDotFlow {
  0%, 100% { opacity: 0.3; transform: translateX(0); }
  50% { opacity: 1; transform: translateX(6px); }
}
@keyframes oiatFadeInOut {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}
@keyframes oiatDash {
  to { stroke-dashoffset: -14; }
}
@keyframes oiatArrowRight {
  0%, 100% { transform: translateX(0); opacity: 0.6; }
  50% { transform: translateX(3px); opacity: 1; }
}
@keyframes oiatArrowLeft {
  0%, 100% { transform: translateX(0); opacity: 0.6; }
  50% { transform: translateX(-3px); opacity: 1; }
}
@keyframes oiatBarGrow {
  0% { transform: scaleY(0); }
  30% { transform: scaleY(1); }
  100% { transform: scaleY(1); }
}
@keyframes oiatCheckDraw {
  0% { stroke-dashoffset: 20; }
  70%, 100% { stroke-dashoffset: 0; }
}
@keyframes oiatSlideUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

/* ---------- Main component ---------- */

export default function OIATStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleLayers, setVisibleLayers] = useState<Set<number>>(new Set());
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    layerRefs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleLayers((prev) => new Set(prev).add(index));
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: [0, 0.25, 0.5, 0.75, 1] }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const orderedIndices = [0, 1, 2, 3];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <div
        ref={containerRef}
        style={{
          maxWidth: 600,
          margin: "2rem auto",
          padding: "1.5rem",
          background: "#F8F4FB",
          borderRadius: 16,
          boxShadow: "0 2px 20px rgba(61, 31, 107, 0.08)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <h3
          style={{
            textAlign: "center",
            margin: "0 0 0.75rem",
            fontSize: "1.15rem",
            fontWeight: 600,
            color: "#3D1F6B",
            letterSpacing: "-0.01em",
          }}
        >
          The OIAT Stack
        </h3>

        {orderedIndices.map((layerIndex, renderOrder) => {
          const layer = layers[layerIndex];
          const isVisible = visibleLayers.has(layerIndex);
          const isHovered = hoveredLayer === layerIndex;
          const Icon = iconMap[layer.id];

          return (
            <div
              key={layer.id}
              ref={(el) => {
                layerRefs.current[layerIndex] = el;
              }}
              onMouseEnter={() => setHoveredLayer(layerIndex)}
              onMouseLeave={() => setHoveredLayer(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "14px 20px",
                borderRadius: 12,
                borderLeft: `4px solid ${isHovered ? layer.borderColor : "transparent"}`,
                background: isHovered
                  ? layer.color
                  : "#FAFAFE",
                boxShadow: isHovered
                  ? "0 4px 16px rgba(61, 31, 107, 0.1)"
                  : "0 1px 4px rgba(61, 31, 107, 0.04)",
                transform: isHovered ? "scale(1.02)" : "scale(1)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "default",
                opacity: isVisible ? 1 : 0,
                animation: isVisible
                  ? `oiatSlideUp 0.5s ease-out ${renderOrder * 0.12}s both`
                  : "none",
                minHeight: 60,
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: "#3D1F6B",
                    marginBottom: 2,
                  }}
                >
                  {layer.name}
                </div>
                <div
                  style={{
                    fontSize: "0.82rem",
                    color: "#5A3A7E",
                    lineHeight: 1.4,
                  }}
                >
                  {layer.description}
                </div>
              </div>
              <div
                style={{
                  flexShrink: 0,
                  width: 56,
                  display: "flex",
                  justifyContent: "center",
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "scale(1)" : "scale(0.8)",
                  transition: "opacity 0.25s ease, transform 0.25s ease",
                }}
              >
                {Icon && <Icon />}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
