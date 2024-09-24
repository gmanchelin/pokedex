import { PaletteMode, Theme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    conditional: {
      true: string;
      false: string;
    }
  }
}

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
      dark: '#8A1010'
    },
    text: {
      secondary: "#ffffff",
    },
    conditional: {
      true: "#ffffff",
      false: "#242424",
    }
  },
  typography: {
    h1: {
      fontSize: "2.3rem",
    },
    h2: {
      fontSize: "1.8rem",
    },
    h3: {
      fontSize: "1.5rem",
    },
    h4: {
      fontSize: "1.3rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.text.secondary,
          borderRadius: 40,
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
            color: theme.palette.text.disabled,
          },
          '&.no-theme-style': {
            backgroundColor: 'inherit',
          },
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
          },
        }),
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: (props: { theme: any; }) => {
          const { theme } = props;
          return {
            color: mode === "light" ? theme.palette.conditional.false : theme.palette.conditional.true,
            '&.Mui-checked': {
              color: theme.palette.secondary.main
            },
          };
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: (props: { theme: any; }) => {
          const { theme } = props;
          return {
            color: theme.palette.secondary.main,
            fontWeight: 'bold',
            textDecoration: 'none',
          };
        },
        underlineAlways: (props: { theme: any; }) => {
          const { theme } = props;
          return {
            color: theme.palette.secondary.main,
          }
        }
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: (props: { theme: any; }) => {
          const { theme } = props;
          return {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.secondary.dark, // Couleur de la bordure par défaut
                borderRadius: 40
              },
              '&:hover fieldset': {
                borderColor: theme.palette.secondary.dark, // Couleur de la bordure au hover
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.secondary.main, // Couleur de la bordure quand le champ est focus
              },
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.secondary.main, // Couleur du label
            },
            '& .MuiInputBase-input': {
              color: theme.palette.text.primary, // Couleur du texte à l'intérieur
            },
          }
        },
      },
    }
  },
});
