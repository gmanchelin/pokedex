import {
  AppBar,
  Toolbar,
  Grid,
  Box,
  Typography,
  IconButton,
  Theme,
} from "@mui/material";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useNavigate } from "react-router-dom";
import Drawer from "./Drawer";

interface HeaderProps {
  mode: "light" | "dark";
  setMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  theme: Theme;
}
function Header({ mode, setMode, theme }: HeaderProps) {
  const navigate = useNavigate();
  return (
    <AppBar position="static" color={"secondary"}>
      <Toolbar>
        <Drawer />
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => navigate("/")}
        >
          <Box
            key="pokedex-icon"
            component="img"
            src="/assets/others/pokedex.svg"
            height={"40px"}
          />
          <Typography component="div" variant="h4">
            PokéDex
          </Typography>
        </Grid>

        <IconButton
          sx={{ ml: 1 }}
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
