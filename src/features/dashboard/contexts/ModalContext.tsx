import { createContext, useContext, useState, type ReactNode } from "react";

interface ModalContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalDashboard = () => {
  const ctx = useContext(ModalContext);
  if (!ctx)
    throw new Error(
      "useModalDashboard must be used within a ModalContextProvider"
    );
  return ctx;
};
