import React from "react";
import { Pokemon } from "../models/Pokemon";
import { useRetroContext } from "../models/RetroContext";
import { useShinyContext } from "../models/ShinyContext";
import { Box } from "@mui/material";

interface SpriteProps {
  pokemon: Pokemon;
  height?: number;
  width?: number;
  isGray?: boolean;
}

const Sprite: React.FC<SpriteProps> = ({ pokemon, height, width, isGray }) => {
  const shinyContext = useShinyContext();
  const retroContext = useRetroContext();

  let imgSrc = "";

  // Sprite home non shiny
  if (!retroContext.retroDisplayed && !shinyContext.shinyDisplayed ) {
    imgSrc = pokemon.sprites.other.home.front_default;
    // Sprite home shiny
  } else if (!retroContext.retroDisplayed && shinyContext.shinyDisplayed) {
    imgSrc = pokemon.sprites.other.home.front_shiny;
    // Sprite pixel non shiny
  } else if (retroContext.retroDisplayed && !shinyContext.shinyDisplayed) {
    imgSrc = pokemon.sprites.front_default;
    // Sprite pixel shiny
  } else if (retroContext.retroDisplayed && shinyContext.shinyDisplayed) {
    imgSrc = pokemon.sprites.front_shiny;
  }

  return (
    <Box
      component="img"
      src={imgSrc}
      key={`pokemon-image-${pokemon!.id}`}
      alt={pokemon!.species.name}
      height={height}
      width={width}
      sx={{
        filter: isGray ? 'contrast(0)' : 'none',
      }}
    />
  )
};

export default Sprite;
