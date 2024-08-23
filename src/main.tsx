import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CssBaseline } from "@mui/material";
import { ShinyProvider } from "./models/ShinyContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline />
    <ShinyProvider>
      <App />
    </ShinyProvider>
  </React.StrictMode>
);
