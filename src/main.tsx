import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@mui/material/styles";
import customTheme from "./theme/customTheme.ts";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={customTheme}>
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>
);
