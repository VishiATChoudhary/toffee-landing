"use client";

import { useEffect, useState, useRef } from "react";

interface Heading {
  id: string;
  text: string;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const content = document.querySelector("[data-mdx-content]");
    if (!content) return;

    const h2s = content.querySelectorAll("h2");
    const items: Heading[] = [];

    h2s.forEach((h2) => {
      if (!h2.id) {
        h2.id = h2.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") ?? "";
      }
      items.push({ id: h2.id, text: h2.textContent ?? "" });
    });

    setHeadings(items);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    h2s.forEach((h2) => observerRef.current?.observe(h2));

    return () => observerRef.current?.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" style={{
      position: "fixed",
      top: "calc(var(--nav-height) + 48px)",
      width: 240,
      maxHeight: "calc(100vh - var(--nav-height) - 96px)",
      overflowY: "auto",
    }}>
      <ul style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}>
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                display: "block",
                padding: "6px 12px",
                fontSize: "0.875rem",
                lineHeight: 1.4,
                color: activeId === h.id ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
                fontWeight: activeId === h.id ? 600 : 400,
                textDecoration: "none",
                borderLeft: activeId === h.id
                  ? "2px solid rgba(255, 255, 255, 0.8)"
                  : "2px solid transparent",
                transition: "all 0.2s ease",
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
