"use client";

import { usePageTransition } from "./PageTransition";
import styles from "./Hero.module.css";
import Button from "./ui/Button";

export default function Hero() {
  const navigate = usePageTransition();

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.headline}>
          E-commerce tools are built for humans.{" "}
          <span className={styles.accent}>That&rsquo;s subject to change.</span>
        </h1>
        <div className={styles.cta}>
          <Button href="/waitlist" variant="ghost" onClick={() => navigate("/waitlist")}>
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
