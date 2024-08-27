import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CssBaseline } from "@mui/material";
import { ShinyProvider } from "./models/ShinyContext.tsx";
import { RetroProvider } from "./models/RetroContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline />
    <ShinyProvider>
      <RetroProvider>
        <App />
      </RetroProvider>
    </ShinyProvider>
  </React.StrictMode>
);
