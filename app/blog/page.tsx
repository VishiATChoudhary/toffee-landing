"use client";

import { useEffect } from "react";
import Link from "next/link";
import BlogClouds from "@/components/blog/BlogClouds";
import Nav from "@/components/Nav";
import styles from "./page.module.css";

const posts = [
  {
    slug: "the-internet-is-getting-a-second-mode",
    title: "The Internet Is Getting a Second Mode",
    description:
      "The companies that optimize for AI agents first will dominate the next era of commerce. Most businesses don't even know there's a race.",
    date: "2026-03-18",
  },
];

export default function BlogIndex() {
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
      <BlogClouds />
      <Nav />
      <main className={styles.main}>
        <h1 className={`${styles.heading} animate-on-scroll`}>Blog</h1>
        <div className={styles.grid}>
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
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
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
