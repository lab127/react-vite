import { ReactNode } from "react";

interface AlertProps {
  // pass content dalam html tag
  // contoh content: <Alert>Hello World</Alert>
  // children: string;
  // ReactNode digunakan agar content dalam componen bisa html
  // contoh ReactNode: <Alert>Hello <strong>World</strong></Alert>
  children: ReactNode;
}

const Alert = ({ children }: AlertProps) => {
  return (
    <div className="alert alert-primary" role="alert">
      {children}
    </div>
  );
};

export default Alert;
