import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}

const sizeVariants = cva("", {
  variants: {
    size: {
      default: "text-lg",
      sm: "text-base",
      lg: "text-xl",
      icon: "",
    },
  },
  defaultVariants: { size: "default" },
});

const paddingVariants = cva("", {
  variants: {
    size: {
      default: "px-20 py-8 text-sm tracking-widest uppercase",
      sm: "px-14 py-6 text-xs tracking-widest uppercase",
      lg: "px-28 py-10 text-sm tracking-widest uppercase",
      icon: "p-8",
    },
  },
  defaultVariants: { size: "default" },
});

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sizeVariants> {
  contentClassName?: string;
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, children, size, contentClassName, ...props }, ref) => {
    return (
      <>
        {/* Hidden SVG filter — only rendered once per page via CSS dedup */}
        <svg
          style={{ position: "absolute", width: 0, height: 0 }}
          aria-hidden="true"
        >
          <defs>
            <filter
              id="liquid-glass-distortion"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.012 0.012"
                numOctaves="3"
                seed="42"
                result="noise"
              />
              <feGaussianBlur in="noise" stdDeviation="3" result="blurred" />
              <feDisplacementMap
                in="SourceGraphic"
                in2="blurred"
                scale="18"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>

        <button
          ref={ref}
          className={cn(
            "liquid-glass-btn",
            sizeVariants({ size }),
            className
          )}
          {...props}
        >
          {/* Layer 1: distortion filter */}
          <span className="liquid-glass-filter" />
          {/* Layer 2: tinted overlay */}
          <span className="liquid-glass-overlay" />
          {/* Layer 3: specular highlight */}
          <span className="liquid-glass-specular" />
          {/* Layer 4: content */}
          <span
            className={cn(
              "liquid-glass-content",
              paddingVariants({ size }),
              contentClassName
            )}
          >
            {children}
          </span>
        </button>
      </>
    );
  }
);
GlassButton.displayName = "GlassButton";

export { GlassButton };
