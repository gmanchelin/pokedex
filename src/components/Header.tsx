import {
  AppBar,
  Toolbar,
  Grid,
  Box,
  Typography,
  Theme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LeftDrawer from "./LeftDrawer";
import RightDrawer from "./RightDrawer";

interface HeaderProps {
  mode: "light" | "dark";
  setMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  theme: Theme;
}
function Header({ mode, setMode, theme }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color={"secondary"}>
      <Toolbar sx={{ flexWrap: 'nowrap' }}>
        <Grid container alignItems={"center"} justifyContent={"space-between"} wrap="nowrap">
          <LeftDrawer />
          <Grid item
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
            <Typography component="div" variant="h1" sx={{
              display: { xs: "none", sm: "block" }, // Masquer sur mobile
            }}>
              PokéDex
            </Typography>
          </Grid>
          <RightDrawer mode={mode} setMode={setMode} theme={theme} />
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
