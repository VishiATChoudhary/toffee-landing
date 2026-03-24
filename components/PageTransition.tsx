"use client";

import { createContext, useContext, useCallback, useRef, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const TransitionContext = createContext<(href: string) => void>(() => {});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [opacity, setOpacity] = useState(0);
  const transitioning = useRef(false);

  useEffect(() => {
    transitioning.current = false;
    const id = requestAnimationFrame(() => setOpacity(1));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname || transitioning.current) return;
      transitioning.current = true;
      setOpacity(0);
      setTimeout(() => router.push(href), 500);
    },
    [pathname, router]
  );

  return (
    <TransitionContext.Provider value={navigate}>
      <div
        style={{
          opacity,
          transition: "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {children}
      </div>
    </TransitionContext.Provider>
  );
}
