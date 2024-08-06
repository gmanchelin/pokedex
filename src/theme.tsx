// Theme.tsx
import { PaletteMode } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#373737",
          },
          secondary: {
            main: "#c71717",
          },
          text: {
            primary: "#373737",
            secondary: "#e4e4e4",
          },
          background: {
            paper: "#e4e4e4",
            default: "#ffffff",
          },
        }
      : {
          primary: {
            main: "#e4e4e4",
          },
          secondary: {
            main: "#c71717",
          },
          text: {
            primary: "#e4e4e4",
            secondary: "#e4e4e4",
          },
          background: {
            paper: "#373737",
            default: "#242424",
          },
        }),
  },
});
