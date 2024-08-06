import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PokemonDetailsPage from "./pages/PokemonDetailsPage";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useMemo, useState } from "react";
import Header from "./components/Header";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                // palette values for light mode
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
                // palette values for dark mode
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
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header mode={mode} theme={theme} setMode={setMode} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="page/:id" element={<PokemonDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
