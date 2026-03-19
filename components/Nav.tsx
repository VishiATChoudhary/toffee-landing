"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";
import Button from "./ui/Button";

export default function Nav() {
  const pathname = usePathname();
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
        <a href="/" className={styles.wordmark}>
          Toffee
        </a>
        <a href="/blog" className={styles.centerLink}>
          Blog
        </a>
        <div className={styles.actions}>
          <Button href="/waitlist" variant="ghost">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
