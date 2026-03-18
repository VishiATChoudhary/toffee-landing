import styles from "./Button.module.css";

type ButtonProps = {
  href: string;
  variant?: "ghost" | "text";
  children: React.ReactNode;
};

export default function Button({ href, variant = "ghost", children }: ButtonProps) {
  return (
    <a href={href} className={`${styles.btn} ${styles[variant]}`}>
      {children}
    </a>
  );
}
