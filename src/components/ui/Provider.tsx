import React, { ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
}

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  return <>{children}</>;
};
