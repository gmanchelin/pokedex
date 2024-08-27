import {
  AppBar,
  Toolbar,
  Grid,
  Box,
  Typography,
  IconButton,
  Theme,
} from "@mui/material";

import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useNavigate } from "react-router-dom";
import Drawer from "./Drawer";
import { useShinyContext } from "../models/ShinyContext";
import { useRetroContext } from "../models/RetroContext";
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

interface HeaderProps {
  mode: "light" | "dark";
  setMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  theme: Theme;
}
function Header({ mode, setMode, theme }: HeaderProps) {
  const navigate = useNavigate();
  const shinyContext = useShinyContext();
  const retroContext = useRetroContext();

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
          {theme.palette.mode === "light" ? (
            <DarkModeIcon />
          ) : (
            <WbSunnyIcon />
          )}
        </IconButton>
        <IconButton
          sx={{
            ml: 1,
          }}
          onClick={() =>
            shinyContext.setShinyDisplayed(!shinyContext.shinyDisplayed)
          }
        >
          <AutoAwesomeIcon
            sx={{
              color:
                theme.palette.conditional[
                shinyContext?.shinyDisplayed ? "true" : "false"
                ],
            }}
          />
        </IconButton>
        <IconButton
          sx={{
            ml: 1,
          }}
          onClick={() =>
            retroContext.setRetroDisplayed(!retroContext.retroDisplayed)
          }
        >
          <VideogameAssetIcon
            sx={{
              color:
                theme.palette.conditional[
                retroContext?.retroDisplayed ? "true" : "false"
                ],
            }}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
