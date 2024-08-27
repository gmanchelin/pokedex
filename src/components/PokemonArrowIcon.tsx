import { Box, Button, Typography } from "@mui/material";
import { Pokemon } from "../models/Pokemon";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import Sprite from "./Sprite";

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

  return (
    isDisplayed && (
      <Button
        onClick={() => {
          navigate(`/page/${pokemon.id}`, {
            state: {
              pokemon: pokemon,
            },
          });
        }}
      >
        {isBefore &&
          <>
            <ArrowBackIcon sx={{ color: "text.primary" }} />
            <Sprite pokemon={pokemon} height={40} width={40} />
          </>
        }
        <Typography sx={{ color: "text.primary" }} textTransform={"capitalize"}>
          #{pokemon.id}
          {" - "}
          {pokemon.species.name}
        </Typography>
        {!isBefore &&
          <>
            <Sprite pokemon={pokemon} height={40} width={40} />
            <ArrowForwardIcon sx={{ color: "text.primary" }} />
          </>
        }
      </Button>
    )
  );
}

export default PokemonArrowIcon;
