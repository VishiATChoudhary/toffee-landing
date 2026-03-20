interface SignalListProps {
  items?: string[] | string;
  columns?: 1 | 2;
}

export default function SignalList({
  items,
  columns = 1,
}: SignalListProps) {
  const normalizedItems = Array.isArray(items)
    ? items
    : typeof items === "string"
      ? items
          .split("||")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "1.25rem auto 2rem",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            columns === 2 ? "repeat(2, minmax(0, 1fr))" : "1fr",
          gap: 10,
        }}
      >
        {normalizedItems.map((item, index) => (
          <div
            key={`${index}-${item}`}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: "6px 0",
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: 8,
                height: 8,
                marginTop: 10,
                borderRadius: "50%",
                background: "#8B5FBF",
                opacity: 0.8,
              }}
            />
            <span
              style={{
                color: "rgba(255, 255, 255, 0.92)",
                fontSize: "1rem",
                lineHeight: 1.55,
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
