"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Clouds from "@/components/Clouds";
import styles from "./page.module.css";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.wrapper}>
      <Clouds />
      <Nav />
      <main className={styles.main}>
        <div className={styles.card}>
          {submitted ? (
            <>
              <h1 className={styles.heading}>You&rsquo;re on the list</h1>
              <p className={styles.description}>
                We&rsquo;ll be in touch when it&rsquo;s your turn.
              </p>
            </>
          ) : (
            <>
              <h1 className={styles.heading}>Get early access</h1>
              <p className={styles.description}>
                Toffee is building the commerce layer for the agentic internet.
                Join the waitlist to be first in line.
              </p>
              <form className={styles.form} onSubmit={handleSubmit}>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />
                <button type="submit" className={styles.button}>
                  Join Waitlist
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
