import {
  AppBar,
  Toolbar,
  Grid,
  Box,
  Typography,
  IconButton,
  Theme,
} from "@mui/material";

import Brightness7Icon from "@mui/icons-material/Brightness7";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useNavigate } from "react-router-dom";
import Drawer from "./Drawer";
import { useShinyContext } from "../models/ShinyContext";

interface HeaderProps {
  mode: "light" | "dark";
  setMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  theme: Theme;
}
function Header({ mode, setMode, theme }: HeaderProps) {
  const navigate = useNavigate();
  const isShiny = useShinyContext();

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
          <Brightness7Icon
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.text.secondary
                  : "black",
            }}
          />
        </IconButton>
        <IconButton
          sx={{
            ml: 1,
          }}
          onClick={() => isShiny.setShinyDisplayed(!isShiny.shinyDisplayed)}
        >
          <AutoAwesomeIcon
            sx={{
              color: isShiny?.shinyDisplayed ? "white" : "gray",
            }}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
