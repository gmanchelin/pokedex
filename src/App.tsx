import { BrowserRouter, redirect, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PokemonDetailsPage from "./pages/PokemonDetailsPage";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import { getDesignTokens } from "./theme";
import GuessItsType from "./pages/GuessItsTypePage";
import TestPage from "./pages/TestPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import { User } from "./models/User";
import { fetchUser } from "./models/SharedFunctions";


function App() {
  const [mode, setMode] = useState<"light" | "dark">(localStorage.getItem("mode") === "light" ? "light" : "dark");
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const token = localStorage.getItem("token");
  const [user, setUser] = useState<User>({ username: "", email: "", img: "" });

  useEffect(() => {
    localStorage.setItem("mode", mode);
    if (token != null) {
      fetchUser().then((user) => setUser(user));
    }
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
          <Route path="login" element={token != null ? <ProfilePage user={user} /> : <LoginPage />} />
          <Route path="profile" element={<ProfilePage user={user}/>} />
          <Route path="signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
