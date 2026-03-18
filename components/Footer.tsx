import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} animate-on-scroll`}>
        <span className={styles.wordmark}>Toffee</span>
        <p className={styles.copyright}>
          © 2026 Toffee · Made with ♥ in Munich
        </p>
      </div>
    </footer>
  );
}
