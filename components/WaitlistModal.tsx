"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./WaitlistModal.module.css";

type WaitlistModalContextValue = {
  open: () => void;
  close: () => void;
};

const WaitlistModalContext = createContext<WaitlistModalContextValue>({
  open: () => {},
  close: () => {},
});

export function useWaitlistModal() {
  return useContext(WaitlistModalContext);
}

export default function WaitlistModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <WaitlistModalContext.Provider value={value}>
      {children}
      {isOpen ? (
        <div className={styles.overlay} onClick={close}>
          <div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.close}
              onClick={close}
              aria-label="Close waitlist popup"
            >
              ×
            </button>
            <div className={styles.content}>
              {submitted ? (
                <>
                  <h2 id="waitlist-modal-title" className={styles.heading}>
                    You&rsquo;re on the list
                  </h2>
                  <p className={styles.description}>
                    We&rsquo;ll be in touch when it&rsquo;s your turn.
                  </p>
                </>
              ) : (
                <>
                  <h2 id="waitlist-modal-title" className={styles.heading}>
                    Get early access
                  </h2>
                  <p className={styles.description}>
                    Toffee is building the commerce layer for the agentic
                    internet. Join the waitlist to be first in line.
                  </p>
                  <form
                    className={styles.form}
                    onSubmit={(event) => {
                      event.preventDefault();
                      setSubmitted(true);
                    }}
                  >
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className={styles.input}
                    />
                    <button type="submit" className={styles.button}>
                      Join Waitlist
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </WaitlistModalContext.Provider>
  );
}
