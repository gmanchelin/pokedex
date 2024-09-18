import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PokemonDetailsPage from "./pages/PokemonDetailsPage";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import { getDesignTokens } from "./theme";
import GuessItsType from "./pages/GuessItsTypePage";
import TestPage from "./pages/TestPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const [mode, setMode] = useState<"light" | "dark">(localStorage.getItem("mode") === "light" ? "light" : "dark");
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  useEffect(() => {
    localStorage.setItem("mode", mode)
  }, [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header mode={mode} theme={theme} setMode={setMode} />
        <Box height="12px" />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="page/:id" element={<PokemonDetailsPage />} />
          <Route path="guess-its-type" element={<GuessItsType />} />
          <Route path="test" element={<TestPage />} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
