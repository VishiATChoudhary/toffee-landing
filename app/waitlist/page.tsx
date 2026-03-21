"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Clouds from "@/components/Clouds";
import styles from "./page.module.css";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "already_signed_up" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus(data.status === "already_signed_up" ? "already_signed_up" : "success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const submitted = status === "success" || status === "already_signed_up";

  return (
    <div className={styles.wrapper}>
      <Clouds />
      <Nav />
      <main className={styles.main}>
        <div className={styles.card}>
          {submitted ? (
            <>
              <h1 className={styles.heading}>
                {status === "already_signed_up"
                  ? "You\u2019re already on the list"
                  : "You\u2019re on the list"}
              </h1>
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
                <button
                  type="submit"
                  className={styles.button}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Joining..." : "Join Waitlist"}
                </button>
                {status === "error" && (
                  <p className={styles.error}>
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
