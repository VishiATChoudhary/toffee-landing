"use client";

import { useEffect, useRef } from "react";

const clouds = [
  { top: "8%",   left: "-12%",  width: 280, speed: 0.2,  flip: true,  opacity: 0.5 },
  { top: "15%",  right: "-8%",  width: 220, speed: 0.35, flip: false, opacity: 0.4 },
  { top: "40%",  left: "8%",    width: 200, speed: 0.15, flip: false, opacity: 0.35 },
  { top: "55%",  right: "3%",   width: 260, speed: 0.3,  flip: true,  opacity: 0.45 },
  { top: "75%",  left: "-6%",   width: 300, speed: 0.25, flip: false, opacity: 0.5 },
  { top: "88%",  right: "-10%", width: 180, speed: 0.4,  flip: true,  opacity: 0.35 },
];

export default function BlogClouds() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const els = containerRef.current?.querySelectorAll<HTMLElement>("[data-cloud]");
        els?.forEach((el) => {
          const speed = parseFloat(el.dataset.speed || "0.3");
          el.style.transform = `translateY(${scrollY * speed}px) ${
            el.dataset.flip === "true" ? "scaleX(-1)" : ""
          }`;
        });
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {clouds.map((c, i) => (
        <img
          key={i}
          src="/cloud1.png"
          alt=""
          data-cloud
          data-speed={c.speed}
          data-flip={c.flip}
          style={{
            position: "absolute",
            top: c.top,
            left: c.left,
            right: c.right,
            width: c.width,
            opacity: c.opacity,
            transform: c.flip ? "scaleX(-1)" : undefined,
            willChange: "transform",
            userSelect: "none",
            filter: "brightness(1.05) saturate(0.9)",
          }}
        />
      ))}
    </div>
  );
}
