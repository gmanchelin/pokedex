import { Box, Button, Grid } from "@mui/material";
import { Pokemon } from "../models/Pokemon";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import Sprite from "./Sprite";
import { useRetroContext } from "../contexts/RetroContext";

interface PokemonArrowIconProps {
  pokemon: Pokemon;
  isBefore: boolean;
  isDisplayed: boolean;
}

function PokemonArrowIcon({
  pokemon,
  isBefore,
  isDisplayed,
}: PokemonArrowIconProps) {
  const navigate = useNavigate();
  const retroContext = useRetroContext();

  return (
    isDisplayed && (
      <Button
      className="no-theme-style"
      disableRipple
        onClick={() => {
          navigate(`/page/${pokemon.id}`, {
            state: {
              pokemon: pokemon,
            },
          });
        }}
      >
        <Grid container flexDirection={"row"} alignItems={"center"}>
          {isBefore &&
            <>
              <ArrowBackIcon sx={{ color: "text.primary" }} />
              <Box height={96} width={96} alignContent={"center"}>
                <Sprite pokemon={pokemon} height={retroContext.retroDisplayed ? 96 : 64} width={retroContext.retroDisplayed ? 96 : 64} />
              </Box>
            </>
          }
          {!isBefore &&
            <>
              <Box height={96} width={96}>
                <Sprite pokemon={pokemon} height={retroContext.retroDisplayed ? 96 : 64} width={retroContext.retroDisplayed ? 96 : 64} />
              </Box>
              <ArrowForwardIcon sx={{ color: "text.primary" }} />
            </>
          }
        </Grid>
      </Button >
    )
  );
}

export default PokemonArrowIcon;
