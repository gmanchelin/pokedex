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
  const img = Sprite(pokemon);

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
        {isBefore && <ArrowBackIcon />}
        <Typography sx={{ color: "text.primary" }} textTransform={"capitalize"}>
          #{pokemon.id}
          {" - "}
          {pokemon.species.name}
        </Typography>
        <Box
          component="img"
          key={`pokemon-image-${pokemon.id}`}
          src={img}
          sx={{ width: "40px", height: "40px" }}
        />
        {!isBefore && <ArrowForwardIcon />}
      </Button>
    )
  );
}

export default PokemonArrowIcon;
