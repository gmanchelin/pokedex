import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { PokemonDetails } from "../models/PokemonDetails";
import { useEffect, useState } from "react";
import { Pokemon } from "../models/Pokemon";
import PokemonArrowIcon from "../components/PokemonArrowIcon";
import { FIRST_POKEMON_ID, LAST_POKEMON_ID } from "../models/SharedValues";
import {
  CapitalizeAndRemoveHyphen,
  getPokemon,
  getPokemonDetails,
} from "../models/SharedFunctions";

function PokemonDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetails>();
  const [pokemonBefore, setPokemonBefore] = useState<Pokemon>();
  const [pokemonAfter, setPokemonAfter] = useState<Pokemon>();
  const [artworkToDisplay, setArtworkToDisplay] = useState("default");

  useEffect(() => {
    async function fetchData() {
      setPokemon(await getPokemonDetails(parseInt(id!)));
      setPokemonBefore(await getPokemon(parseInt(id!) - 1));
      setPokemonAfter(await getPokemon(parseInt(id!) + 1));
    }
    fetchData();
  });

  // TODO : Fonction qui gère les shiny, à exporter sur l'application entière
  function handleArtworkToDisplay(event: React.ChangeEvent<HTMLInputElement>) {
    const artworkToDisplay = event.target.value;
    setArtworkToDisplay(artworkToDisplay);
  }
  return (
    <Grid container spacing={2}>
      <Box>
        {pokemonBefore && (
          <PokemonArrowIcon
            pokemon={pokemonBefore}
            isBefore={true}
            isDisplayed={pokemon!.id > FIRST_POKEMON_ID}
          />
        )}
        {pokemonAfter && (
          <PokemonArrowIcon
            pokemon={pokemonAfter}
            isBefore={false}
            isDisplayed={pokemon!.id < LAST_POKEMON_ID}
          />
        )}
      </Box>
      <Grid item xs={12} sm={6} md={4}>
        <Typography textTransform={"capitalize"}>
          #{pokemon?.id} - {pokemon?.species.name}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Box
          component="img"
          key={`pokemon-details-image-${pokemon?.id}`}
          src={
            artworkToDisplay === "default"
              ? pokemon?.sprites.other.home.front_default
              : pokemon?.sprites.other.home.front_shiny
          }
        />
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="default"
            name="radio-buttons-group"
            onChange={handleArtworkToDisplay}
          >
            <FormControlLabel
              value="default"
              control={<Radio />}
              label="Normal"
            />
            <FormControlLabel value="shiny" control={<Radio />} label="Shiny" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Box>
          Abilities :
          {pokemon?.abilities.map((ability) => (
            <Box key={`ability-${ability.slot}`}>
              <Typography textTransform={"capitalize"}>
                {ability.is_hidden
                  ? "Hidden Ability - "
                  : `Ability ${ability.slot} - `}
                {CapitalizeAndRemoveHyphen(ability.ability.name)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}

export default PokemonDetailsPage;
