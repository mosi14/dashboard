import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Toaster position="top-center" />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
