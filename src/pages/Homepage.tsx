import { Grid, TablePagination } from "@mui/material";
import { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";
import { Pokemon } from "../models/Pokemon";

function Homepage() {
  const [pokemonArray, setPokemonArray] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${rowsPerPage}&offset=${
            page * rowsPerPage
          }`
        );
        const data = await res.json();
        const pokemonList = data.results;

        // Fetch detailed data for each Pokemon concurrently
        const pokemonPromises = pokemonList.map((pokemon: { name: unknown }) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(
            (res) => res.json()
          )
        );

        // Wait for all promises to resolve
        const pokemonData = await Promise.all(pokemonPromises);

        // Update the state once with all Pokemon data
        setPokemonArray(pokemonData);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    getPokemon();
  }, [rowsPerPage, page]);

  return (
    <>
      <Grid container spacing={2}>
        {pokemonArray.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.id} />
        ))}
      </Grid>
      <TablePagination
        component="div"
        count={1025}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          "& .MuiTablePagination-toolbar .MuiInputBase-root .MuiSvgIcon-root": {
            color: "#e4e4e4", // Change the dropdown arrow color to white
          },
        }}
      />
    </>
  );
}

export default Homepage;
