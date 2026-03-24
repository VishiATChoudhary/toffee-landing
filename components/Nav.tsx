"use client";

import { useState, useEffect } from "react";
import { usePageTransition } from "./PageTransition";
import { useWaitlistModal } from "./WaitlistModal";
import styles from "./Nav.module.css";
import Button from "./ui/Button";

export default function Nav() {
  const navigate = usePageTransition();
  const { open } = useWaitlistModal();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${styles.scrolled}`}>
      <div className={styles.inner}>
        <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className={styles.wordmark}>
          Toffee
        </a>
        <a href="/blog" onClick={(e) => { e.preventDefault(); navigate("/blog"); }} className={styles.centerLink}>
          Blog
        </a>
        <div className={styles.actions}>
          <Button href="/waitlist" variant="ghost" onClick={open}>
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
