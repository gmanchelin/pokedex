import { useEffect, useState } from "react";
import { Pokemon } from "../models/Pokemon";
import { LAST_POKEMON_ID } from "../models/SharedValues";
import { getPokemon } from "../models/SharedFunctions";
import TypeIcon from "../components/TypeIcon";
import { Box, Button, Grid, Typography } from "@mui/material";

function GuessItsTypePage() {
  const [id, setId] = useState<number>(randomNumber);
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [numberOfTries, setNumberOfTries] = useState<number>(0);
  const [numberOfGoodAnswers, setNumberOfGoodAnswers] = useState<number>(0);
  // const [openSnackbar, setOpenSnackbar] = useState(false);

  const types = [
    "normal",
    "grass",
    "fire",
    "water",
    "electric",
    "bug",
    "flying",
    "poison",
    "rock",
    "ground",
    "fighting",
    "psychic",
    "ghost",
    "ice",
    "dragon",
    "steel",
    "dark",
    "fairy",
  ];

  useEffect(() => {
    async function fetchData() {
      setPokemon(await getPokemon(id));
    }
    fetchData();
  }, [id]);

  function randomNumber() {
    return 1 + Math.floor(Math.random() * LAST_POKEMON_ID);
  }

  function handleSubmit() {
    const pokemonTypes = pokemon!.types.map((el) => el.type.name);
    const guess =
      selectedTypes.length === pokemonTypes.length &&
      pokemonTypes.every((type) => selectedTypes.includes(type));
    if (guess) {
      alert("DING DING! Good answer!");
      setNumberOfGoodAnswers(numberOfGoodAnswers + 1);
    } else {
      alert(
        `BZZZT! Wrong answer! ${pokemon?.species.name.toUpperCase()} ${
          pokemonTypes.length == 1 ? "type is" : "types are"
        } ${pokemonTypes.join(", ").toUpperCase()}`
      );
    }
    // setOpenSnackbar(true);
    setSelectedTypes([]);
    setId(randomNumber());
    setNumberOfTries(numberOfTries + 1);
  }

  const handleSelectType = (type: string) => () => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((element) => element !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
    //Si déjà présent dans selectedType on retire, sinon on ajoute
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignContent={"center"}
        direction={"column"}
      >
        <Grid item>
          <Typography variant="h4" textAlign={"center"}>
            Guess Its Type
          </Typography>
        </Grid>
        <Grid item>
          <Box
            component={"p"}
            textAlign={"center"}
            justifyContent={"space-around"}
            display={"flex"}
          >
            <Typography>Number of tries : {numberOfTries}</Typography>
            <Typography>Good answers : {numberOfGoodAnswers}</Typography>
          </Box>
        </Grid>

        {pokemon?.sprites.other.home.front_default && (
          <Grid item>
            <Box
              component="img"
              src={pokemon.sprites.other.home.front_default}
              alt={pokemon.species.name}
              height={200}
              width={200}
            />
            <Typography
              variant="h4"
              textTransform={"capitalize"}
              textAlign="center"
            >
              {pokemon.species.name}
            </Typography>
          </Grid>
        )}
      </Grid>
      <Box component={"p"} textAlign={"center"}>
        <Grid container spacing={2} justifyContent={"center"}>
          {types.map((type) => (
            <Grid item lg={2} md={3} sm={4} xs={6} key={type}>
              <TypeIcon
                type={type}
                onClick={handleSelectType(type)}
                isSelected={selectedTypes.includes(type)}
              />
            </Grid>
          ))}

          <Grid item>
            <Button
              disabled={selectedTypes.length === 0}
              onClick={handleSubmit}
            >
              Guess
            </Button>
            {/* <Snackbar
              open={openSnackbar}
              autoHideDuration={5000}
              message="This Snackbar will be dismissed in 5 seconds."
            /> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default GuessItsTypePage;
