import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TablePagination,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      home: {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

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
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
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

        console.log(pokemonData[0]);
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
          <Grid item xs={12} sm={6} md={4} mt={2} mb={2} lg={3}>
            <Card
              sx={{
                flex: "1 1 0", // Allow cards to grow and shrink
                display: "flex",
                height: "100%",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: 96,
                  height: 96,
                }}
                image={pokemon.sprites.other.home.front_default}
              />

              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography
                  component="div"
                  variant="h4"
                  textTransform={"capitalize"}
                >
                  {pokemon.name}
                </Typography>
                <Typography
                  component="div"
                  variant="h5"
                  textTransform={"capitalize"}
                >
                  {pokemon.types[0].type.name}
                  {pokemon.types[1] ? "/" + pokemon.types[1].type.name : ""}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <TablePagination
        component="div"
        count={1025}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default App;
