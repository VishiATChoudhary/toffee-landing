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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNav = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className={`${styles.nav} ${styles.scrolled}`}>
      <div className={styles.inner}>
        <a href="/" onClick={handleNav("/")} className={styles.wordmark}>
          Toffee
        </a>
        <div className={styles.centerLinks}>
          <a href="/blog" onClick={handleNav("/blog")} className={styles.centerLink}>
            Blog
          </a>
          <a href="https://docs.toffee.at" className={styles.centerLink} target="_blank" rel="noopener noreferrer">
            Docs
          </a>
          <a href="https://db.toffee.at" className={styles.centerLink} target="_blank" rel="noopener noreferrer">
            Dashboard
          </a>
        </div>
        <div className={styles.actions}>
          <Button href="/waitlist" variant="ghost" onClick={open}>
            Get Started
          </Button>
        </div>
        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)}>
          <div className={styles.menu} onClick={(e) => e.stopPropagation()}>
            <a href="/blog" onClick={handleNav("/blog")} className={styles.menuLink}>
              Blog
            </a>
            <a href="https://docs.toffee.at" className={styles.menuLink} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
              Docs
            </a>
            <a href="https://db.toffee.at" className={styles.menuLink} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
              Dashboard
            </a>
            <Button href="/waitlist" variant="ghost" onClick={() => { setMenuOpen(false); open(); }}>
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
