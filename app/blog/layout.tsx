import styles from "./layout.module.css";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.blogLayout}>
      <nav className={styles.nav}>
        <a href="/" className={styles.wordmark}>
          Toffee
        </a>
        <a href="/blog" className={styles.blogLink}>
          Blog
        </a>
      </nav>
      {children}
    </div>
  );
}
