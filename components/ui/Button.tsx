import styles from "./Button.module.css";

type ButtonProps = {
  href: string;
  variant?: "ghost" | "text";
  active?: boolean;
  children: React.ReactNode;
};

export default function Button({ href, variant = "ghost", active, children }: ButtonProps) {
  return (
    <a
      href={href}
      className={`${styles.btn} ${styles[variant]} ${active ? styles.active : ""}`}
    >
      {children}
    </a>
  );
}
