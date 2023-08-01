interface ButtonProps {
  children: string;
  //   color? artinya color optional
  //   union option, biar isi color tidak ngasal
  color?: "primary" | "secondary" | "success" | "danger";
  onClick: () => void;
}

// tambah default value props
const Button = ({ children, color = "primary", onClick }: ButtonProps) => {
  return (
    <button type="button" className={"btn btn-" + color} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
