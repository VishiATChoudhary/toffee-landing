import styles from "./Nav.module.css";
import Button from "./ui/Button";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <a href="/" className={styles.wordmark}>
          Toffee
        </a>
        <div className={styles.actions}>
          <Button href="/login" variant="text">
            Log in
          </Button>
          <Button href="/get-started" variant="ghost">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
