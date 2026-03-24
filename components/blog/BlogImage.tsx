export default function BlogImage(
  props: React.ImgHTMLAttributes<HTMLImageElement>
) {
  const { alt = "", style, ...rest } = props;
  const caption =
    alt === "Future of AI x Retail panel at Wharton"
      ? "Left to right: Eric T. Bradlow, Stacey Bendet, John Imah, and Anita Beveridge-Raffo."
      : "";

  return (
    <span
      style={{
        display: "block",
        margin: "2rem 0",
      }}
    >
      <img
        alt={alt}
        style={{
          display: "block",
          width: "100%",
          borderRadius: 16,
          boxShadow: "0 12px 32px rgba(61, 31, 107, 0.12)",
          ...style,
        }}
        {...rest}
      />
      {caption ? (
        <span
          style={{
            display: "block",
            marginTop: 10,
            fontSize: "0.86rem",
            lineHeight: 1.5,
            color: "rgba(255, 255, 255, 0.72)",
            textAlign: "center",
          }}
        >
          {caption}
        </span>
      ) : null}
    </span>
  );
}
