"use client";

import { useEffect } from "react";
import Clouds from "@/components/Clouds";
import Nav from "@/components/Nav";
import { usePageTransition } from "@/components/PageTransition";
import PageFooter from "@/components/PageFooter";
import styles from "./page.module.css";

const posts = [
  {
    slug: "why-geo-is-not-enough",
    title: "Why GEO Is Not Enough",
    description:
      "Most companies think GEO solves agentic commerce. It doesn't. Here's what the full stack actually looks like.",
    date: "2026-03-20",
  },
];

export default function BlogIndex() {
  const navigate = usePageTransition();

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
    <div className={styles.gradientBg}>
      <Clouds />
      <Nav />
      <main className={styles.main}>
        <h1 className={`${styles.heading} animate-on-scroll`}>Blog</h1>
        <div className={styles.grid}>
          {posts.map((post, i) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              onClick={(event) => {
                event.preventDefault();
                navigate(`/blog/${post.slug}`);
              }}
              className={`${styles.card} animate-on-scroll`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <time className={styles.cardDate} dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <h2 className={styles.cardTitle}>{post.title}</h2>
              <p className={styles.cardDescription}>{post.description}</p>
              <span className={styles.readMore}>Read &rarr;</span>
            </a>
          ))}
        </div>
      </main>
      <PageFooter />
    </div>
  );
}
