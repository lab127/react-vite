import { ReactNode } from "react";

interface AlertProps {
  // pass content dalam html tag
  // contoh content: <Alert>Hello World</Alert>
  // children: string;
  // ReactNode digunakan agar content dalam componen bisa html
  // contoh ReactNode: <Alert>Hello <strong>World</strong></Alert>
  children: ReactNode;
  // buat close button
  onClose: () => void;
}

const Alert = ({ children, onClose }: AlertProps) => {
  return (
    <div className="alert alert-primary alert-dismissible" role="alert">
      {children}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default Alert;
