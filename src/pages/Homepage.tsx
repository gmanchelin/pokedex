import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TablePagination,
} from "@mui/material";
import { useState, useEffect, SetStateAction } from "react";
import PokemonCard from "../components/PokemonCard";
import { Pokemon } from "../models/Pokemon";
import { LAST_POKEMON_ID } from "../models/SharedValues";
import { Generation } from "../models/Generations";

function Homepage() {
  const [pokemonArray, setPokemonArray] = useState<Pokemon[]>([]);
  const [selectedGeneration, setSelectedGeneration] = useState("Kanto");

  const generations: Generation[] = [
    { name: "Kanto", start: 1, end: 151 },
    { name: "Johto", start: 152, end: 251 },
    { name: "Hoenn", start: 252, end: 386 },
    { name: "Sinnoh", start: 387, end: 493 },
    { name: "Unova", start: 494, end: 649 },
    { name: "Kalos", start: 650, end: 721 },
    { name: "Alola", start: 722, end: 809 },
    { name: "Galar", start: 810, end: 905 },
    { name: "Paldea", start: 906, end: 1025 },
  ];

  const handleChangeGeneration = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedGeneration(event.target.value);
  };

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const genToFetch = generations.find(
          (generation) => generation.name === selectedGeneration
        );
        if (!genToFetch) {
          throw new Error("Generation not found");
        }
        const { start, end } = genToFetch;
        const limit = end - start + 1;
        const offset = start - 1;
        console.log(offset, limit);

        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        const data = await res.json();
        const pokemonList = data.results;

        const pokemonPromises = pokemonList.map((pokemon: { name: unknown }) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(
            (res) => res.json()
          )
        );

        const pokemonData = await Promise.all(pokemonPromises);

        setPokemonArray(pokemonData);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    getPokemon();
  }, [selectedGeneration]);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" sx={{ color: "white" }}>
          Options
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedGeneration}
          label="Options"
          onChange={handleChangeGeneration}
          sx={{
            ".MuiSvgIcon-root": {
              color: "white", // Arrow color
            },
          }}
        >
          <MenuItem value="Kanto" defaultChecked>
            Kanto
          </MenuItem>
          <MenuItem value="Johto">Johto</MenuItem>
          <MenuItem value="Hoenn">Hoenn</MenuItem>
          <MenuItem value="Sinnoh">Sinnoh</MenuItem>
          <MenuItem value="Unova">Unova</MenuItem>
          <MenuItem value="Kalos">Kalos</MenuItem>
          <MenuItem value="Alola">Alola</MenuItem>
          <MenuItem value="Galar">Galar</MenuItem>
          <MenuItem value="Paldea">Paldea</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={2}>
        {pokemonArray.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.id} />
        ))}
      </Grid>
    </>
  );
}

export default Homepage;
