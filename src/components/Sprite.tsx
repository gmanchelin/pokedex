import { Pokemon } from "../models/Pokemon";
import { PokemonDetails } from "../models/PokemonDetails";
import { useRetroContext } from "../models/RetroContext";
import { useShinyContext } from "../models/ShinyContext";

function Sprite(pokemon: Pokemon | PokemonDetails) {
  const shinyContext = useShinyContext();
  const retroContext = useRetroContext();

  if (!retroContext.retroDisplayed && shinyContext.shinyDisplayed) {
    return pokemon.sprites.other.home.front_shiny;
  }

  if (!retroContext.retroDisplayed && !shinyContext.shinyDisplayed) {
    return pokemon.sprites.other.home.front_default;
  }

  if (retroContext.retroDisplayed && !shinyContext.shinyDisplayed) {
    return pokemon.sprites.front_default;
  }

  if (retroContext.retroDisplayed && shinyContext.shinyDisplayed) {
    return pokemon.sprites.front_shiny;
  }
}

export default Sprite;
