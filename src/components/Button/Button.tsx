import styles from "./Button.module.css";

interface ButtonProps {
  children: string;
  //   color? artinya color optional
  //   union option, biar isi color tidak ngasal
  color?: "primary" | "secondary";
  onClick: () => void;
}

// tambah default value props
const Button = ({ children, color = "primary", onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className={[styles.btn, styles["btn-" + color]].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
