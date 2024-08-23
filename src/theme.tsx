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
  },
});
