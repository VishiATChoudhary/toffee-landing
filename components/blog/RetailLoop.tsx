const steps = [
  "Discover demand",
  "Shape product",
  "Market product",
  "Sell product",
  "Allocate inventory",
  "Reorder faster",
  "Learn from the result",
];

export default function RetailLoop() {
  return (
    <div
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        padding: "1.5rem",
        background: "#F8F4FB",
        borderRadius: 16,
        boxShadow: "0 2px 20px rgba(61, 31, 107, 0.08)",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          margin: "0 0 1rem",
          fontSize: "1.15rem",
          fontWeight: 600,
          color: "#3D1F6B",
          letterSpacing: "-0.01em",
        }}
      >
        The Retail AI Loop
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 10,
        }}
      >
        {steps.map((step, index) => (
          <div
            key={step}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 14px",
              borderRadius: 12,
              background: "#EDE9F5",
              color: "#3D1F6B",
              boxShadow: "0 1px 4px rgba(61, 31, 107, 0.04)",
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: 24,
                height: 24,
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#8B5FBF",
                color: "#FFFFFF",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {index + 1}
            </span>
            <span
              style={{
                fontSize: "0.92rem",
                lineHeight: 1.3,
                fontWeight: 500,
              }}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
