import { Box, Grid, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
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
import Sprite from "../components/Sprite";


function PokemonDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { pokemon } = location.state || {};
  const [pokemonSelected, setPokemonSelected] = useState<PokemonDetails>();
  const [pokemonBefore, setPokemonBefore] = useState<Pokemon>();
  const [pokemonAfter, setPokemonAfter] = useState<Pokemon>();

  useEffect(() => {
    async function fetchData() {
      setPokemonSelected(await getPokemonDetails(parseInt(id!)));
      setPokemonBefore(await getPokemon(parseInt(id!) - 1));
      setPokemonAfter(await getPokemon(parseInt(id!) + 1));
    }

    fetchData();
  });

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
          #{pokemonSelected?.id} - {pokemonSelected?.species.name}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Sprite pokemon={pokemon!} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Box>
          Abilities :
          {pokemonSelected?.abilities.map((ability) => (
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
