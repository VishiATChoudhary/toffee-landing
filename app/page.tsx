"use client";

import { useEffect } from "react";
import Nav from "@/components/Nav";
import Clouds from "@/components/Clouds";
import Hero from "@/components/Hero";
import AiAgents from "@/components/AiAgents";
import EmbraceChange from "@/components/EmbraceChange";
import PageFooter from "@/components/PageFooter";

export default function Home() {
  useEffect(() => {
    const els = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Clouds />
      <Nav />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <AiAgents />
        <EmbraceChange />
        <PageFooter />
      </main>
    </div>
  );
}
