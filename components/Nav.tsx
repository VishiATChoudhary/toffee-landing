"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { usePageTransition } from "./PageTransition";
import styles from "./Nav.module.css";
import Button from "./ui/Button";

export default function Nav() {
  const pathname = usePathname();
  const navigate = usePageTransition();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className={styles.wordmark}>
          Toffee
        </a>
        <a href="/blog" onClick={(e) => { e.preventDefault(); navigate("/blog"); }} className={styles.centerLink}>
          Blog
        </a>
        <div className={styles.actions}>
          <Button href="/waitlist" variant="ghost" onClick={() => navigate("/waitlist")}>
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
