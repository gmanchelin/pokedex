import { Box, FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
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
  getPokemonSpecies,
} from "../models/SharedFunctions";
import Sprite from "../components/Sprite";
import StatGauge from "../components/StatGauge";
import { useRetroContext } from "../contexts/RetroContext";
import TypeIcon from "../components/TypeIcon";
import { PokemonSpecies } from "../models/PokemonSpecies";

function PokemonDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { pokemon } = location.state || {};
  const [pokemonSelected, setPokemonSelected] = useState<PokemonDetails>();
  const [pokemonBefore, setPokemonBefore] = useState<Pokemon>();
  const [pokemonAfter, setPokemonAfter] = useState<Pokemon>();
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies>();
  const retroContext = useRetroContext();
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    fetchData();
  }, [id]);

  async function fetchData() {
    setPokemonSelected(await getPokemonDetails(parseInt(id!)));
    setPokemonBefore(await getPokemon(parseInt(id!) - 1));
    setPokemonAfter(await getPokemon(parseInt(id!) + 1));
    setPokemonSpecies(await getPokemonSpecies(parseInt(id!)));
    setSelectedValue(pokemon.species.name);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedValue(event.target.value)
    pokemonSpecies?.varieties.map(async (variety) => {
      if (variety.pokemon.name === event.target.value) {
        await getPokemonDetails(parseInt(variety.pokemon.url.split("/")[6])).then(
          (res) => {
            setPokemonSelected(res);
          }
        );
      }
    })
  };

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
            #{pokemon?.id} - {pokemonSelected?.species.name}
          </Typography>
        </Grid>
        <Grid item>
          <Box height={192} width={192} justifyContent={"center"} display={"flex"} alignItems={"center"}>
            <Sprite pokemon={pokemonSelected!} height={retroContext.retroDisplayed ? 96 : 192} width={retroContext.retroDisplayed ? 96 : 192} />
          </Box>
        </Grid>
        {pokemonSpecies && pokemonSpecies!.varieties.length > 1 &&
          <FormControl>
            <Typography variant={"h3"}>Species</Typography>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="{{variety.pokemon.name}}"
              name="radio-buttons-group"
            >
              {pokemonSpecies?.varieties.map((variety, index) => (
                <FormControlLabel key={index} value={variety.pokemon.name} control={<Radio onChange={handleChange} checked={variety.pokemon.name === selectedValue} />} label={CapitalizeAndRemoveHyphen(variety.pokemon.name)} />
              ))}
            </RadioGroup>
          </FormControl>
        }
        <Grid container spacing={2} alignItems={"center"} justifyContent="center">
          <Grid item>
            <TypeIcon type={pokemonSelected!.types[0].type.name} />
          </Grid>
          {pokemonSelected!.types[1] && (
            <Grid item>
              <TypeIcon type={pokemonSelected!.types[1].type.name} />
            </Grid>
          )}
        </Grid>

      </Grid>

      <Grid container spacing={2} direction={"column"} alignItems={"center"}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography textTransform={"capitalize"} variant="h3">Abilities :</Typography>
          {pokemonSelected?.abilities.map((ability) => (
            <Box key={`ability-${ability.slot}`}>
              <Typography textTransform={"capitalize"} >
                {ability.is_hidden
                  ? "Hidden Ability - "
                  : `Ability ${ability.slot} - `}
                {CapitalizeAndRemoveHyphen(ability.ability.name)}
              </Typography>
            </Box>
          ))}
          <Typography textTransform={"capitalize"} variant="h3">
            Base Stats (Total : {pokemonSelected?.stats.reduce((acc, stat) => acc + stat.base_stat, 0)}):
            {pokemonSelected?.stats.map((stat: { stat: { name: string; }; base_stat: number; }) => <StatGauge statName={stat.stat.name} statValue={stat.base_stat} key={stat.stat.name} />
            )}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Level</TableCell>
                  <TableCell>Move</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pokemonSelected?.moves
                  .filter((move) => move.version_group_details[0].level_learned_at > 0) // Filtrer les moves avec un niveau > 0
                  .sort((a, b) => a.version_group_details[0].level_learned_at - b.version_group_details[0].level_learned_at) // Trier par niveau
                  .map((move) => (
                    <TableRow key={move.move.name}>
                      <TableCell>{move.version_group_details[0].level_learned_at}</TableCell>
                      <TableCell>{CapitalizeAndRemoveHyphen(move.move.name)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default PokemonDetailsPage;
