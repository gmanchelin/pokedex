import { PaletteMode } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          background: {
            paper: "#e4e4e4",
            default: "#ffffff",
          },
          text: {
            primary: "#373737",
          },
        }
      : {
          background: {
            paper: "#373737",
            default: "#242424",
          },
          text: {
            primary: "#e4e4e4",
          },
        }),
    secondary: {
      main: "#c71717",
    },
    text: {
      secondary: "#ffffff",
    },
    conditional: {
      true: "#ffffff",
      false: "#242424",
    },
  },
  typography: {
    h1: {
      fontSize: "3rem",
    },
    h2: {
      fontSize: "2.5rem",
    },
    h3: {
      fontSize: "2rem",
    }
  }
});
