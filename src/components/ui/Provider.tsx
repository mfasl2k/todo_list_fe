import React, { ReactNode } from "react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

interface ProviderProps {
  children: ReactNode;
}

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <ChakraProvider value={defaultSystem}>
      {children}
      <Toaster position="top-right" />
    </ChakraProvider>
  );
};
