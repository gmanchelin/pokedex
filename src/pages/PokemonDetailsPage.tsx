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
import {
  FIRST_POKEMON_ID,
  CapitalizeAndRemoveHyphen,
  LAST_POKEMON_ID,
} from "../models/SharedValues";

function PokemonDetailsPage() {
  const [pokemon, setPokemon] = useState<PokemonDetails>();
  const [pokemonBefore, setPokemonBefore] = useState<Pokemon>();
  const [pokemonAfter, setPokemonAfter] = useState<Pokemon>();
  const { id } = useParams<{ id: string }>();
  const [artworkToDisplay, setArtworkToDisplay] = useState("default");

  async function getPokemon() {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setPokemon(data);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
    return pokemon;
  }

  async function getPokemonBefore() {
    if (parseInt(id!) > 1) {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${parseInt(id!) - 1}`
        );
        const data = await res.json();
        setPokemonBefore(data);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    }
  }

  async function getPokemonAfter() {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${parseInt(id!) + 1}`
      );
      const data = await res.json();
      setPokemonAfter(data);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      await getPokemon();
      await getPokemonBefore();
      await getPokemonAfter();
    }
    fetchData();
  });

  function handleArtworkToDisplay(event: React.ChangeEvent<HTMLInputElement>) {
    const artworkToDisplay = event.target.value;
    setArtworkToDisplay(artworkToDisplay);
  }
  return (
    <Grid container spacing={2}>
      <Box component={"div"}>
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
        <Box component="p">
          <Typography textTransform={"capitalize"}>
            #{pokemon?.id} - {pokemon?.species.name}
          </Typography>
        </Box>
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
        <Box component="p">
          Abilities :
          {pokemon?.abilities.map((ability) => (
            <Box key={`ability-${ability.slot}`} component="p">
              <Typography textTransform={"capitalize"}>
                {ability.is_hidden
                  ? "Hidden Ability : "
                  : `Ability ${ability.slot} : `}
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
