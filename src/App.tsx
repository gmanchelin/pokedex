import { Grid, TablePagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pokemon } from "./models/Pokemon";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [pokemonArray, setPokemonArray] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
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
        const res = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=" +
            rowsPerPage +
            "&offset=" +
            page * rowsPerPage
        );
        const pokemonList = res.data.results;

        // Fetch detailed data for each Pokemon concurrently
        const pokemonPromises = pokemonList.map((pokemon: { name: any }) =>
          axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        );

        // Wait for all promises to resolve
        const pokemonDetails = await Promise.all(pokemonPromises);

        // Extract the data from the responses
        const pokemonData = pokemonDetails.map((p) => p.data);

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
          '& .MuiTablePagination-toolbar .MuiInputBase-root .MuiSvgIcon-root': {
            color: '#e4e4e4', // Change the dropdown arrow color to white
          },
        }}
      />
    </>
  );
}

export default App;
