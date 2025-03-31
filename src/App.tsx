import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import AppRoutes from "./route";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
          <Toaster position="top-right" />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
