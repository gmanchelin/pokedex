import { Pokemon } from "../models/Pokemon";
import { PokemonDetails } from "../models/PokemonDetails";
import { useShinyContext } from "../models/ShinyContext";

function Sprite(pokemon: Pokemon | PokemonDetails) {
  const shinyContext = useShinyContext();
  return shinyContext.shinyDisplayed
    ? pokemon.sprites.other.home.front_shiny
    : pokemon.sprites.other.home.front_default;
}

export default Sprite;
