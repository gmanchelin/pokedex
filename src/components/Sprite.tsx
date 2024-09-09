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
  let imgAlt = "";

  // Sprite home non shiny
  if (!retroContext.retroDisplayed && !shinyContext.shinyDisplayed ) {
    imgSrc = pokemon.sprites.other.home.front_default;
    imgAlt = `${pokemon!.species.name} home sprite`;
    // Sprite home shiny
  } else if (!retroContext.retroDisplayed && shinyContext.shinyDisplayed) {
    imgSrc = pokemon.sprites.other.home.front_shiny;
    imgAlt = `${pokemon!.species.name} shiny home sprite`;
    // Sprite pixel non shiny
  } else if (retroContext.retroDisplayed && !shinyContext.shinyDisplayed) {
    imgSrc = pokemon.sprites.front_default;
    imgAlt = `${pokemon!.species.name}-retro sprite`;
    // Sprite pixel shiny
  } else if (retroContext.retroDisplayed && shinyContext.shinyDisplayed) {
    imgSrc = pokemon.sprites.front_shiny;
    imgAlt = `${pokemon!.species.name} shiny retro sprite`;
  }

  return (
    <Box
      component="img"
      src={imgSrc}
      key={`pokemon-image-${pokemon!.id}`}
      alt={imgAlt}
      height={height}
      width={width}
      sx={{
        filter: isGray ? 'contrast(0)' : 'none',
      }}
    />
  )
};

export default Sprite;
