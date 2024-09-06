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
import StatGauge from "../components/StatGauge";
import { useRetroContext } from "../models/RetroContext";
import TypeIcon from "../components/TypeIcon";

function PokemonDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { pokemon } = location.state || {};
  const [pokemonSelected, setPokemonSelected] = useState<PokemonDetails>();
  const [pokemonBefore, setPokemonBefore] = useState<Pokemon>();
  const [pokemonAfter, setPokemonAfter] = useState<Pokemon>();
  const retroContext = useRetroContext();

  useEffect(() => {
    async function fetchData() {
      setPokemonSelected(await getPokemonDetails(parseInt(id!)));
      setPokemonBefore(await getPokemon(parseInt(id!) - 1));
      setPokemonAfter(await getPokemon(parseInt(id!) + 1));
    }
    fetchData();
  });

  return (
    <>
      <Grid container spacing={2} alignItems={"center"} justifyContent={"space-between"}>
        <Grid item>
          {pokemonBefore && (
            <PokemonArrowIcon
              pokemon={pokemonBefore}
              isBefore={true}
              isDisplayed={pokemon!.id > FIRST_POKEMON_ID} />
          )}
        </Grid>
        <Grid item>
          {pokemonAfter && (
            <PokemonArrowIcon
              pokemon={pokemonAfter}
              isBefore={false}
              isDisplayed={pokemon!.id < LAST_POKEMON_ID} />
          )}
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems={"center"} justifyContent="center" direction={"column"}>
        <Grid item>
          <Typography textTransform={"capitalize"} variant="h2">
            #{pokemonSelected?.id} - {pokemonSelected?.species.name}
          </Typography>
        </Grid>
        <Grid item>
          <Box height={192} width={192} justifyContent={"center"} display={"flex"} alignItems={"center"}>
            <Sprite pokemon={pokemon!} height={retroContext.retroDisplayed ? 96 : 192} width={retroContext.retroDisplayed ? 96 : 192} />
          </Box>
        </Grid>
        <Grid container spacing={2} alignItems={"center"} justifyContent="center">
          <Grid item>
            <TypeIcon type={pokemon.types[0].type.name} />
          </Grid>
          {pokemon.types[1] && (
            <Grid item>
              <TypeIcon type={pokemon.types[1].type.name} />
            </Grid>
          )}
        </Grid>

      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
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
          <Typography>
            Base Stats :
            {pokemon?.stats.map((stat: { stat: { name: string; }; base_stat: number; }) => <StatGauge statName={stat.stat.name} statValue={stat.base_stat} />
            )}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default PokemonDetailsPage;
