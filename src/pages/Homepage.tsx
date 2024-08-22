import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState, useEffect, SetStateAction } from "react";
import PokemonCard from "../components/PokemonCard";
import { Pokemon } from "../models/Pokemon";
import { generations } from "../models/Generations";

function Homepage() {
  const [pokemonArray, setPokemonArray] = useState<Pokemon[]>([]);
  const [selectedGeneration, setSelectedGeneration] = useState("Kanto");

  const handleChangeGeneration = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedGeneration(event.target.value);
  };

  useEffect(() => {Homepage
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
