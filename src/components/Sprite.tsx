import React from "react";
import { Pokemon } from "../models/Pokemon";
import { useRetroContext } from "../contexts/RetroContext";
import { useShinyContext } from "../contexts/ShinyContext";
import { Box } from "@mui/material";
import { PokemonDetails } from "../models/PokemonDetails";

interface SpriteProps {
  pokemon: Pokemon | PokemonDetails;
  height?: number;
  width?: number;
  isGray?: boolean;
}

const Sprite: React.FC<SpriteProps> = ({ pokemon, height, width, isGray }) => {
  const shinyContext = useShinyContext();
  const retroContext = useRetroContext();

  let imgSrc = "";
  let imgAlt = "";
  const url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"

  // Artwork officiel non shiny
  if (!retroContext.retroDisplayed && !shinyContext.shinyDisplayed ) {
    pokemon.id
    imgSrc = `${url}/other/official-artwork/${pokemon!.id}.png`
    imgAlt = `${pokemon!.species.name} official artwork`;
    // Artwork officiel shiny
  } else if (!retroContext.retroDisplayed && shinyContext.shinyDisplayed) {
    imgSrc = `${url}/other/official-artwork/shiny/${pokemon!.id}.png`
    imgAlt = `${pokemon!.species.name} shiny official artwork`;
    // Sprite pixel non shiny
  } else if (retroContext.retroDisplayed && !shinyContext.shinyDisplayed) {
    imgSrc = `${url}/${pokemon!.id}.png`;
    imgAlt = `${pokemon!.species.name} retro sprite`;
    // Sprite pixel shiny
  } else if (retroContext.retroDisplayed && shinyContext.shinyDisplayed) {
    imgSrc = `${url}/shiny/${pokemon!.id}.png`;
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
