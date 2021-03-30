import { ReactNode } from "react";

export interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  children: ReactNode;
}
