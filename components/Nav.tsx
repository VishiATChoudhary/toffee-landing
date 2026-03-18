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
        <div className={styles.actions}>
          <Button href="/blog" variant="text" active={pathname.startsWith("/blog")}>
            Blog
          </Button>
          <Button href="/login" variant="text">
            Log in
          </Button>
          <Button href="/get-started" variant="ghost">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
