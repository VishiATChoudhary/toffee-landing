import styles from "./PageFooter.module.css";

export default function PageFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.cta}>
        <h2 className={styles.ctaHeading}>Interested? Get in touch now!</h2>
        <a
          href="mailto:vishisht.choudhary@tum.de"
          className={styles.ctaLink}
        >
          Send us an email &rarr;
        </a>
      </div>
      <span className={styles.wordmark}>Toffee</span>
      <p className={styles.copyright}>
        &copy; 2026 Toffee &middot; Made with &hearts; in Munich
      </p>
    </footer>
  );
}
