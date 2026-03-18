"use client";

import { useEffect, useRef } from "react";
import styles from "./Clouds.module.css";

const clouds = [
  // Hero area
  { top: "5%",   left: "-8%",  width: 320, speed: 0.35, flip: false, opacity: 0.8 },
  { top: "12%",  right: "-5%", width: 260, speed: 0.5,  flip: true,  opacity: 0.7 },
  { top: "22%",  left: "10%",  width: 180, speed: 0.25, flip: false, opacity: 0.5 },

  // Mid page
  { top: "35%",  right: "5%",  width: 300, speed: 0.45, flip: true,  opacity: 0.75 },
  { top: "42%",  left: "-6%",  width: 220, speed: 0.3,  flip: false, opacity: 0.6 },
  { top: "55%",  left: "15%",  width: 160, speed: 0.55, flip: true,  opacity: 0.5 },

  // Lower page
  { top: "65%",  right: "-4%", width: 280, speed: 0.4,  flip: false, opacity: 0.7 },
  { top: "75%",  left: "-10%", width: 350, speed: 0.3,  flip: true,  opacity: 0.8 },
  { top: "85%",  right: "8%",  width: 200, speed: 0.5,  flip: false, opacity: 0.6 },
  { top: "92%",  left: "5%",   width: 240, speed: 0.35, flip: true,  opacity: 0.55 },
];

export default function Clouds() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const els = containerRef.current?.querySelectorAll<HTMLElement>(
          `.${styles.cloud}`
        );
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
    <div ref={containerRef} className={styles.container} aria-hidden="true">
      {clouds.map((c, i) => (
        <img
          key={i}
          src="/cloud1.png"
          alt=""
          className={styles.cloud}
          data-speed={c.speed}
          data-flip={c.flip}
          style={{
            top: c.top,
            left: c.left,
            right: c.right,
            width: c.width,
            opacity: c.opacity,
            transform: c.flip ? "scaleX(-1)" : undefined,
          }}
        />
      ))}
    </div>
  );
}
