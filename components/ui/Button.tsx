import styles from "./Button.module.css";

type ButtonProps = {
  href: string;
  variant?: "ghost" | "text";
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

export default function Button({ href, variant = "ghost", active, onClick, children }: ButtonProps) {
  return (
    <a
      href={href}
      onClick={onClick ? (e) => { e.preventDefault(); onClick(); } : undefined}
      className={`${styles.btn} ${styles[variant]} ${active ? styles.active : ""}`}
    >
      {children}
    </a>
  );
}
